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

GildedRose.updateQuality = function (items) {
  return items.map((item) => {
    this._isNormalItem(item.name)
      ? this._updateNormalItemQuality(item)
      : this._updateSpecialItemQuality(item);

    this._decreaseSellIn(item);

    this._checkSellInNegative(item);

    this._checkMaxQuality(item);

    return item;
  });
};

GildedRose._isLegendaryItem = function (name) {
  return name === "Sulfuras, Hand of Ragnaros";
};

GildedRose._isNormalItem = function (name) {
  return (
    name !== "Aged Brie" && name !== "Backstage passes to a TAFKAL80ETC concert"
  );
};

GildedRose._updateNormalItemQuality = function (item) {
  if (item.quality > 0 && !this._isLegendaryItem(item.name)) {
    item.name === "Conjured Mana Cake"
      ? (item.quality -= 2)
      : (item.quality -= 1);
  }
};

GildedRose._updateSpecialItemQuality = function (item) {
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

GildedRose._decreaseSellIn = function (item) {
  if (!this._isLegendaryItem(item.name)) item.sellIn -= 1;
};

GildedRose._checkMaxQuality = function (item) {
  if (!this._isLegendaryItem(item.name) && item.quality > 50)
    item.quality = 50;
};

GildedRose._checkSellInNegative = function (item) {
  if (item.sellIn < 0) {
    this._isNormalItem(item.name)
      ? this._updateNormalItemQuality(item)
      : (item.quality = 0);
  }
};