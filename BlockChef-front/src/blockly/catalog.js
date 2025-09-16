export const CATEGORY_ORDER = ["재료", "메인 요리동작", "재료 준비동작", "동작제어"];

// 재료 이름 (가나다)
const ING_NAMES = [
  // solid
  "김치","밥","라면사리","김밥용 단무지","당근","감자","양파","돼지고기","떡국 떡",
  "대파","소고기","다진 마늘","소갈비","무","배","다진 생강","홀 토마토","월계수 잎",
  "타임","베이컨","파스타면","양송이버섯","그라나파다노",
  // liquid
  "간장","물","국간장","액젓","올리고당","굴소스","맛술","청주","레드와인","흰우유",
  // oil
  "식용유","버터","참기름","올리브유",
  // powder
  "라면스프","소금","김가루","짜장가루","카레가루","후추","설탕",
].sort((a, b) => a.localeCompare(b, "ko-KR"));

// 동작
const ACTIONS_WITH_TIME = ["mix", "fry", "boil", "simmer"];
const ACTIONS_WITHOUT_TIME = ["slice", "put", "grind"];

export const CATALOG = {
  "재료": [
    { type: "ingredient", label: "재료", template: "ingredient_block", fields: { QUANTITY: 1, UNIT: "개" } },
    { type: "combine_val", label: "합치기", template: "combine_block", fields: {} },
    ...ING_NAMES.map((n) => ({
      type: `ing_name_${n}`,
      label: n,
      template: `ingredient_name_${n}`,
      fields: {},
    })),
  ],

  "메인 요리동작": [
    ...ACTIONS_WITH_TIME.map((k) => ({
      type: `${k}_stmt`,
      label: k,
      template: `${k}_block`,
      fields: { TIME: 5, UNIT: "분" },
    })),
    ...ACTIONS_WITHOUT_TIME.map((k) => ({
      type: `${k}_stmt`,
      label: k,
      template: `${k}_block`,
      fields: {},
    })),
    { type: "wait_stmt", label: "wait", template: "wait_block", fields: { TIME: 5, UNIT: "분" } },

    // ✅ 추가: 모양 만들기(Statement)
    { type: "shape_stmt", label: "모양 만들기", template: "shape_block", fields: { SHAPE: "원" } },
  ],

  "재료 준비동작": [
    // 동작 합치기 블록 (기존 그대로 유지)
    { type: "action_combine", label: "동작 합치기", template: "action_combine_block", fields: {} },

    ...ACTIONS_WITH_TIME.map((k) => ({
      type: `${k}_val`,
      label: k,
      template: `${k}_value_block`,
      fields: { TIME: 5, UNIT: "분" },
    })),
    ...ACTIONS_WITHOUT_TIME.map((k) => ({
      type: `${k}_val`,
      label: k,
      template: `${k}_value_block`,
      fields: {},
    })),

    // ✅ 추가: 모양 만들기(Value)
    { type: "shape_val", label: "모양 만들기", template: "shape_value_block", fields: { SHAPE: "원" } },
  ],

  "동작제어": [
    { type: "start", template: "start_block", fields: {} },
    { type: "repeat_n", template: "repeat_n_times", fields: { COUNT: 3 } },
    { type: "repeat_until", template: "repeat_until_true", fields: { CONDITION: "예: 면이 익을" } },
    { type: "if_simple", template: "if_condition_block", fields: { CONDITION: "예: 물이 끓으면" } },
    { type: "continue", template: "continue_block", fields: {} },
    { type: "break", template: "break_block", fields: {} },
    { type: "finish", template: "finish_block", fields: {} },
    // { type: "action_adapter", label: "동작→값 어댑터", template: "action_adapter_block", fields: {} },
  ],
};












