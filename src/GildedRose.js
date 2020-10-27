/*
    2006-30-84
    Leeroy was here!!
    
    Leeroy <lerooy@example.com>
*/
var GildedRose = function () {
  var items = [];
  items.push(new Item("+5 Dexterity Vest", 10, 20));
  items.push(new Item("Aged Brie", 2, 0));
  items.push(new Item("Elixir of the Mongoose", 5, 7));
  items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
  items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
  items.push(new Item("Conjured Mana Cake", 3, 6));
  GildedRose.updateQuality(items);
};

GildedRose.updateNormalItemQuality = function (item) {
  if (item.quality > 0 && item.name !== "Sulfuras, Hand of Ragnaros") {
    item.name === "Conjured Mana Cake" ? item.quality -= 2 : item.quality -= 1;
  }
};

GildedRose.updateSpecialItemQuality = function (item) {
  if (item.quality < 50) {
    item.quality += 1;

    if (item.sellIn < 11) {
      item.quality += 1;
    }

    if (item.sellIn < 6) {
      item.quality += 1;
    }
  }
};

GildedRose.decreaseSellIn = function (item) {
  if (item.name !== "Sulfuras, Hand of Ragnaros") item.sellIn -= 1;
};

GildedRose.checkMaxQuality = function (item) {
  if ("Sulfuras, Hand of Ragnaros" !== item.name && item.quality > 50)
    item.quality = 50;
};

GildedRose.checkSellInNegative = function (item) {
  if (item.sellIn < 0) {
    item.name !== "Aged Brie" &&
    item.name !== "Backstage passes to a TAFKAL80ETC concert"
      ? this.updateNormalItemQuality(item)
      : (item.quality = 0);
  }
};

GildedRose.updateQuality = function (items) {
  return items.map((item) => {
    item.name !== "Aged Brie" &&
    item.name !== "Backstage passes to a TAFKAL80ETC concert"
      ? this.updateNormalItemQuality(item)
      : this.updateSpecialItemQuality(item);

    this.decreaseSellIn(item);

    this.checkSellInNegative(item);

    this.checkMaxQuality(item);

    return item;
  });
};
