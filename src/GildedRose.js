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

GildedRose.isLegendaryItem = function (name) {
  return name === "Sulfuras, Hand of Ragnaros";
};

GildedRose.isNormalItem = function (name) {
  return (
    name !== "Aged Brie" && name !== "Backstage passes to a TAFKAL80ETC concert"
  );
};

GildedRose.updateNormalItemQuality = function (item) {
  if (item.quality > 0 && !this.isLegendaryItem(item.name)) {
    item.name === "Conjured Mana Cake"
      ? (item.quality -= 2)
      : (item.quality -= 1);
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
  if (!this.isLegendaryItem(item.name)) item.sellIn -= 1;
};

GildedRose.checkMaxQuality = function (item) {
  if (!this.isLegendaryItem(item.name) && item.quality > 50)
    item.quality = 50;
};

GildedRose.checkSellInNegative = function (item) {
  if (item.sellIn < 0) {
    this.isNormalItem(item.name)
      ? this.updateNormalItemQuality(item)
      : (item.quality = 0);
  }
};

GildedRose.updateQuality = function (items) {
  return items.map((item) => {
    this.isNormalItem(item.name)
      ? this.updateNormalItemQuality(item)
      : this.updateSpecialItemQuality(item);

    this.decreaseSellIn(item);

    this.checkSellInNegative(item);

    this.checkMaxQuality(item);

    return item;
  });
};
