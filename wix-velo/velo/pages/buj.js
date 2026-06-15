import { FAQ_ITEMS_LV } from "public/faqData";

$w.onReady(function () {
  const data = FAQ_ITEMS_LV.map((item, i) => ({
    _id: String(i),
    question: item.q,
    answer: item.a,
    ...item,
  }));

  if ($w("#faqRepeater")) {
    $w("#faqRepeater").data = data;
    $w("#faqRepeater").onItemReady(($item, itemData) => {
      if ($item("#faqQuestion")) $item("#faqQuestion").text = itemData.q;
      if ($item("#faqAnswer")) $item("#faqAnswer").text = itemData.a;
    });
  }
});
