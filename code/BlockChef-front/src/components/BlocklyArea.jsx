// src/components/BlocklyArea.jsx
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as Blockly from "blockly";
import "blockly/blocks";
import "blockly/msg/ko";
import "../blockly/custom_renderer";

import "../blockly/blocks";
import { CATALOG, CATEGORY_ORDER } from "../blockly/catalog";
import "../blockly/blockly.css";
import { installSemantics } from "../blockly/semantics";

const BlockChefTheme = Blockly.Theme.defineTheme("blockchef", {
  base: Blockly.Themes.Classic,
  categoryStyles: {
    ingredient_category: { colour: "#b08968" },
    action_category: { colour: "#d9776f" },
    flow_category: { colour: "#6aa6e8" },
  },
  blockStyles: {
    ingredient_blocks: { colourPrimary: "#b08968", colourSecondary: "#caa27e", colourTertiary: "#8c6f56" },
    action_main_blocks:    { colourPrimary: "#d9776f", colourSecondary: "#eba39d", colourTertiary: "#ba625b" }, // 조리(문장)
    action_value_blocks:   { colourPrimary: "#2bb5ae", colourSecondary: "#7bdad5", colourTertiary: "#1e8d87" }, // 조리값(값)
    action_blocks:       { colourPrimary: "#d9776f", colourSecondary: "#eba39d", colourTertiary: "#ba625b" },
    flow_blocks: { colourPrimary: "#6aa6e8", colourSecondary: "#8fbaf0", colourTertiary: "#4f89c5" },
  },
  componentStyles: {
    flyoutBackgroundColour: "#efefef",
    flyoutOpacity: 1,
    flyoutForegroundColour: "#d9d9d9",
    flyoutForegroundOpacity: 1,
    workspaceBackgroundColour: "transparent",
    toolboxBackgroundColour: "transparent",
    toolboxForegroundColour: "#666",
    insertionMarker: "#ffb703",
    insertionMarkerOpacity: 0.6,
    scrollbars: true,
  },
});

const PALETTE_MARGIN = 8;

/* --------------------------
 * Flyout 스크롤 보정(이전과 동일)
 * -------------------------- */
function ensureFlyoutScroll(ws) {
  const flyout = ws?.getFlyout?.();
  if (!flyout) return;
  try {
    flyout.reflow?.();
    flyout.scrollToStart?.();
    flyout.workspace_?.scrollbar?.resize?.();
  } catch {}

  const rootEl =
    flyout.svgBackground_?.parentNode ||
    flyout.svgGroup_ ||
    flyout.workspace_?.getParentSvg?.() ||
    null;
  if (!rootEl) return;

  if (flyout.__wheelFix) {
    rootEl.removeEventListener("wheel", flyout.__wheelFix);
  }
  const wheelFix = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof flyout.wheel === "function") flyout.wheel(e);
    else if (typeof flyout.onMouseWheel_ === "function") flyout.onMouseWheel_(e);
  };
  rootEl.addEventListener("wheel", wheelFix, { passive: false });
  flyout.__wheelFix = wheelFix;
}

/* --------------------------
 * 툴박스 컨텐츠 생성
 *  - 재료 카테고리는 맨 위에 sep로 여백을 넣어 검색창 공간 확보
 * -------------------------- */
function safeToolboxContents(list) {
  const out = [];
  list.forEach((e) => {
    const type = e.template;
    if (!type || !Blockly.Blocks[type]) return;
    out.push({
      kind: "block",
      type,
      fields: e.fields || {},
    });
  });
  return out;
}

function makeToolboxJson(activeCategory) {
  const entries = CATALOG[activeCategory] ?? [];
  const contents = safeToolboxContents(entries);

  // 재료 카테고리라면 상단에 여백(검색창 자리) 확보
  if (activeCategory === "재료") {
    return {
      kind: "flyoutToolbox",
      contents: [
        { kind: "sep", gap: 44 }, // 입력창(36px 정도) + 마진
        ...contents,
      ],
    };
  }
  return { kind: "flyoutToolbox", contents };
}

/* 안전 XML 파서 (버전별 fallback) */
function toDom(xmlMaybe) {
  const xmlStr =
    typeof xmlMaybe === "string"
     ? xmlMaybe
     : typeof xmlMaybe === "object"
     ? new XMLSerializer().serializeToString(xmlMaybe)
     : "";
  if (!xmlStr) return null;
  try { if (Blockly.Xml?.textToDom) return Blockly.Xml.textToDom(xmlStr); } catch {}
  try { if (Blockly.utils?.xml?.textToDom) return Blockly.utils.xml.textToDom(xmlStr); } catch {}
  try { return new DOMParser().parseFromString(xmlStr, "text/xml").documentElement; } catch {}
  return null;
}

/* --------------------------
 * 재료 팔레트 상단 검색창 + 자동완성 + 스크롤/하이라이트
 * -------------------------- */
function installIngredientSearchUI(ws, hostEl) {
  const flyout = ws?.getFlyout?.();
  if (!flyout) return () => {};
  const fw = flyout.workspace_;
  if (!fw) return () => {};

  // 기존 남아있던 검색 UI 제거(중복 방지)
  const old = hostEl.querySelector(".bc-ing-search");
  if (old) old.remove();

  // 재료 이름 목록 추출 (CATALOG['재료']에서 ing_name_* 만)
  const ingNames = (CATALOG["재료"] || [])
    .filter((e) => String(e.type || "").startsWith("ing_name_"))
    .map((e) => e.label);

  // flyout 위치 계산 → host 기준 절대좌표로 입력창 오버레이
  const flyRect = flyout.svgGroup_?.getBoundingClientRect?.();
  const hostRect = hostEl.getBoundingClientRect();
  const left = Math.max(8, (flyRect?.left || hostRect.left) - hostRect.left + 8);
  const top = Math.max(8, (flyRect?.top || hostRect.top) - hostRect.top + 8);

  // 컨테이너
  const wrap = document.createElement("div");
  wrap.className = "bc-ing-search";
  Object.assign(wrap.style, {
    position: "absolute",
    left: `${left}px`,
    top: `${top}px`,
    width: "180px",
    zIndex: 20,
  });

  // 입력창
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "재료 검색 (예: 소금)";
  Object.assign(input.style, {
    width: "100%",
    padding: "6px 8px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "12px",
    background: "rgba(255,255,255,0.97)",
    outline: "none",
  });

  // 자동완성
  const list = document.createElement("div");
  Object.assign(list.style, {
    position: "absolute",
    left: "0",
    right: "0",
    top: "32px",
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
    maxHeight: "200px",
    overflowY: "auto",
    display: "none",
    zIndex: 21,
  });

  let items = [];
  let hi = -1; // highlight index

  const renderList = (q) => {
    list.innerHTML = "";
    if (!q) {
      list.style.display = "none";
      items = [];
      hi = -1;
      return;
    }
    const lower = q.toLowerCase();
    const matched = ingNames.filter((n) => n.toLowerCase().includes(lower));
    if (matched.length === 0) {
      list.style.display = "none";
      items = [];
      hi = -1;
      return;
    }
    matched.slice(0, 40).forEach((name, idx) => {
      const it = document.createElement("div");
      it.textContent = name;
      Object.assign(it.style, {
        padding: "6px 8px",
        fontSize: "12px",
        cursor: "pointer",
      });
      it.addEventListener("mouseenter", () => highlight(idx));
      it.addEventListener("mouseleave", () => highlight(-1));
      it.addEventListener("mousedown", (e) => {
        e.preventDefault();
        select(name);
      });
      list.appendChild(it);
    });
    items = Array.from(list.children);
    list.style.display = "block";
    hi = -1;
  };

  const highlight = (idx) => {
    hi = idx;
    items.forEach((el, i) => {
      el.style.background = i === hi ? "#fff4e5" : "#fff";
    });
  };

  const getFlyoutBlocks = () => {
    if (fw?.getAllBlocks) return fw.getAllBlocks(false);
    if (fw?.getTopBlocks) return fw.getTopBlocks(false);
    return [];
  };

  const centerOnIngredientBlock = (name) => {
    const type = `ingredient_name_${name}`;
    const blocks = getFlyoutBlocks();
    const b = blocks.find((bl) => bl && bl.type === type);
    if (!b) return false;

    try {
      // 최신/구버전 metrics 모두 커버
      const mgr = fw.getMetricsManager?.();
      const m =
        (mgr && mgr.getMetrics && mgr.getMetrics()) ||
        (fw.getMetrics && fw.getMetrics()) ||
        {};

      const viewH = m.viewHeight ?? m.viewHeight_ ?? 0;
      const contentH = m.contentHeight ?? m.contentHeight_ ?? 0;

      const xy = b.getRelativeToSurfaceXY();
      const bh = b.getHeight ? b.getHeight() : (b.height || 40);

      let targetY = Math.max(0, xy.y + bh / 2 - viewH / 2);
      targetY = Math.min(targetY, Math.max(0, contentH - viewH));

      // 스크롤 다중 fallback
      const pair = fw.scrollbar || flyout.scrollbar;
      try {
        if (pair?.set) {
          // ScrollbarPair.set(x, y) 인 경우도 있고 set(y)인 경우도 있음
          try { pair.set(0, targetY); } catch { pair.set(targetY); }
        } else if (pair?.setY) {
          pair.setY(targetY);
        } else if (pair?.verticalScrollbar?.set) {
          pair.verticalScrollbar.set(targetY);
        } else if (pair?.setVertical) {
          pair.setVertical(targetY);
        } else if (typeof flyout.scrollTo === "function") {
          flyout.scrollTo(targetY);
        }
      } catch {}

      // 하이라이트(테두리)
      const root = b.getSvgRoot?.() || b.svgGroup_;
      if (root) {
        root.classList.add("bc-flyout-highlight");
        setTimeout(() => root.classList.remove("bc-flyout-highlight"), 8000);
      }
    } catch {}
    return true;
  };

  const select = (name) => {
    input.value = name;
    list.style.display = "none";
    highlight(-1);
    // reflow/metrics 안정화 이후 스크롤 시도
    setTimeout(() => centerOnIngredientBlock(name), 0);
  };

  // 이벤트
  input.addEventListener("input", (e) => renderList(e.target.value));
  input.addEventListener("keydown", (e) => {
    if (list.style.display === "none") return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      highlight(Math.min(items.length - 1, hi + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      highlight(Math.max(0, hi - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (hi >= 0 && items[hi]) select(items[hi].textContent);
      else if (input.value.trim()) select(input.value.trim());
    } else if (e.key === "Escape") {
      list.style.display = "none";
      highlight(-1);
    }
  });

  document.addEventListener(
    "mousedown",
    (ev) => {
      if (!wrap.contains(ev.target)) {
        list.style.display = "none";
        highlight(-1);
      }
    },
    { capture: true }
  );

  wrap.appendChild(input);
  wrap.appendChild(list);
  hostEl.appendChild(wrap);

  // cleanup
  return () => {
    try { wrap.remove(); } catch {}
  };
}

const BlocklyArea = forwardRef(function BlocklyArea(
  { initialXml = "", onXmlChange, onDirtyChange, activeCategory = CATEGORY_ORDER[0] },
  ref
) {
  const hostRef = useRef(null);
  const workspaceRef = useRef(null);
  const changeListenerRef = useRef(null);
  const dragStartPosRef = useRef(new Map());
  const cleanupSearchRef = useRef(() => {});

  useEffect(() => {
    if (!hostRef.current) return;

    const ws = Blockly.inject(hostRef.current, {
      theme: BlockChefTheme,
      toolbox: makeToolboxJson(activeCategory),
      renderer: "chef_geras",
      toolboxPosition: "start",
      collapse: false,
      comments: false,
      disable: false,
      trashcan: true,
      grid: { spacing: 20, length: 3, colour: "#eeeeee", snap: true },
      zoom: { controls: true, wheel: true, startScale: 1, maxScale: 2, minScale: 0.4, pinch: true },
      move: { scrollbars: { horizontal: false, vertical: true }, drag: true, wheel: true },
      sounds: false,
    });
    workspaceRef.current = ws;

    installSemantics(ws);

    if (initialXml) {
      try {
        const dom = toDom(initialXml);
        if (dom) Blockly.Xml.domToWorkspace(dom, ws);
      } catch (e) {
        console.error("초기 XML 로드 실패:", e);
      }
    }

    // 생성 시 lockFields 적용
    const lockOnCreate = (ev) => {
      if (ev.type !== Blockly.Events.BLOCK_CREATE) return;
      (ev.ids || []).forEach((id) => {
        const b = ws.getBlockById(id);
        if (!b) return;
        if (b.data) {
          try {
            const meta = JSON.parse(b.data);
            (meta.lockFields || []).forEach((fname) => {
              const field = b.getField(fname);
              if (field?.setEditable) field.setEditable(false);
            });
          } catch {}
        }
      });
    };
    ws.addChangeListener(lockOnCreate);

    // 팔레트 튜닝 + 스크롤 보정 + 재료 검색창 설치
    const flyout = ws.getFlyout?.();
    if (flyout) {
      if (typeof flyout.isDeleteArea === "function") {
        flyout.isDeleteArea = function () { return false; };
      }
      if (typeof flyout.gap_ === "number") flyout.gap_ = 16;
      try { flyout.reflow?.(); flyout.reflowInternal?.(); } catch {}
      ensureFlyoutScroll(ws);
    }
    if (activeCategory === "재료") {
      cleanupSearchRef.current = installIngredientSearchUI(ws, hostRef.current);
    }

    // 드래그 종료 시 경계 보정
    const onDrag = (ev) => {
      if (ev.type !== Blockly.Events.BLOCK_DRAG) return;
      const b = ws.getBlockById(ev.blockId);
      if (!b || b.isShadow()) return;
      const f = ws.getFlyout?.();
      const flyoutWidth = f?.getWidth ? f.getWidth() : 0;
      const minX = Math.max(0, flyoutWidth - 90 + PALETTE_MARGIN);
      if (ev.isStart) {
        const start = b.getRelativeToSurfaceXY();
        dragStartPosRef.current.set(ev.blockId, { x: start.x, y: start.y });
      } else if (ev.isEnd) {
        const xy = b.getRelativeToSurfaceXY();
        if (xy.x < minX) {
          const start = dragStartPosRef.current.get(ev.blockId);
          if (start) b.moveBy(start.x - xy.x, start.y - xy.y);
          else b.moveBy(minX - xy.x, 0);
        }
        dragStartPosRef.current.delete(ev.blockId);
      }
    };
    ws.addChangeListener(onDrag);

    // 변경 → XML 반영 + dirty 통지
    let rafId = null;
    changeListenerRef.current = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        try {
          const dom = Blockly.Xml.workspaceToDom(ws);
          const xml = Blockly.Xml.domToText(dom);
          onXmlChange?.(xml);
          onDirtyChange?.(ws.getTopBlocks(false).length > 0);
        } catch {}
      });
    };
    ws.addChangeListener(changeListenerRef.current);

    const ro = new ResizeObserver(() => Blockly.svgResize(ws));
    ro.observe(hostRef.current);

    return () => {
      try { if (changeListenerRef.current) ws.removeChangeListener(changeListenerRef.current); ws.dispose(); } catch {}
      ro.disconnect();
      cleanupSearchRef.current?.();
      workspaceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount once

  // 카테고리 전환 시 팔레트 업데이트 + 재료 검색창 교체
  useEffect(() => {
    const ws = workspaceRef.current;
    if (!ws) return;
    const tb = makeToolboxJson(activeCategory);
    const raf = requestAnimationFrame(() => {
      const flyout = ws.getFlyout?.();
      try { flyout?.setVisible?.(false); } catch {}
      ws.updateToolbox(tb);
      try {
        flyout?.setVisible?.(true);
        if (typeof flyout?.gap_ === "number") flyout.gap_ = 16;
        flyout?.reflow?.();
        flyout?.reflowInternal?.();
        ensureFlyoutScroll(ws);
      } catch {}
      // 재료 카테고리일 때만 검색창 장착, 아니면 제거
      cleanupSearchRef.current?.();
      cleanupSearchRef.current = () => {};
      if (activeCategory === "재료") {
        cleanupSearchRef.current = installIngredientSearchUI(ws, hostRef.current);
      }
      Blockly.svgResize(ws);
    });
    return () => cancelAnimationFrame(raf);
  }, [activeCategory]);

  // 외부 제어 API
  useImperativeHandle(ref, () => ({
    getXml() {
      const ws = workspaceRef.current;
      if (!ws) return "";
      const dom = Blockly.Xml.workspaceToDom(ws);
      return Blockly.Xml.domToText(dom);
    },
    loadXml(xmlText) {
      const ws = workspaceRef.current;
      if (!ws) return;
      ws.clear();
      if (!xmlText) return;
      try {
        const dom = toDom(xmlText);
        if (dom) Blockly.Xml.domToWorkspace(dom, ws);
      } catch (e) {
        console.error("XML 불러오기 실패:", e);
      }
    },
    clear() { workspaceRef.current?.clear(); },
    undo() {
      const ws = workspaceRef.current;
      if (ws?.undo) ws.undo(false);
    },
    redo() {
      const ws = workspaceRef.current;
      if (ws?.undo) ws.undo(true);
    },
    hasAnyBlocks() {
      const ws = workspaceRef.current;
      if (!ws) return false;
      return ws.getTopBlocks(false).length > 0;
    },
  }));

  return (
    <div
      ref={hostRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    />
  );
});

export default BlocklyArea;


























