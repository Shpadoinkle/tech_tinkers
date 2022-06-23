const data = {
  title: "DEV UP YOUR STANDARDS BUNDLE",
  handle: "dev-up-your-standards-bundle",
  image:
    "//cdn.shopify.com/s/files/1/1336/7071/collections/8x9.png?v=1592273728",
  products: [
    {
      price: 12995,
      tags: [
        "some-other-tag",
        "script=bundle:id=1588842633:value=14995:count=3:index=2",
        "script=bundle:id=1589427400:value=21995:count=4:index=4",
      ],
    },
    {
      price: 5995,
      tags: ["script=bundle:id=1588842633:value=14995:count=3:index=1"],
    },
    {
      price: 25000,
      tags: [
        "script=bundle:id=1588148704:value=24995:count=3:index=2",
        "script=bundle:id=1588842633:value=14995:count=3:index=3",
      ],
    },
    {
      price: 2000,
      tags: [
        "script=bundle:id=1588148704:value=24995:count=3:index=2",
        "script=bundle:id=1588842633:value=14995:count=3:index=3",
      ],
    },
    {
      price: 5995,
      tags: [
        "script=bundle:id=1588842633:value=14995:count=3:index=2",
        "script=bundle:id=1589427400:value=21995:count=4:index=4",
      ],
    },
  ],
};

// seperate list of products
const { products } = data;

// function to break up tag string into object with readable values
function breakProductTag(string) {
  const productValues = {};
  for (var param of string.split(":")) {
    const [key, val] = param.split("=");
    productValues[key] = val;
  }
  return productValues;
}

const bundleKeys = {};
const indexKeys = {};

/**
 *
 * iterate through product list to build objects based on tag string
 * Then use this string to also build a keystore of bundle ids
 * and an indexKey array to sort the products into their respective indexes
 */
let expandedProducts = products.map((p) => {
  p.tagObjects = p.tags.map((t) => {
    let expObj = breakProductTag(t);
    if (expObj.id) {
      if (!bundleKeys[expObj.id]) {
        bundleKeys[expObj.id] = {
          id: expObj.id,
          count: Number(expObj.count),
          value: expObj.value,
          productsCount: 0,
          indexKeys: {},
        };
      }
      bundleKeys[expObj.id].productsCount++;

      if (!bundleKeys[expObj.id].indexKeys[expObj.index])
        bundleKeys[expObj.id].indexKeys[expObj.index] = [];

      bundleKeys[expObj.id].indexKeys[expObj.index].push(p);
    }
    return expObj;
  });
  return p;
});

/**
 *
 * A bit unsure of your real world application and use.. so might be wrong with this assumption
 * for determining the current bundle.
 * But basically assuming if a particular bundleId exists on every product in the array.. then this is the bundle in question
 */
let currentBundle = Object.values(bundleKeys).find((b) => {
  return b.productsCount === products.length;
});

console.log("@@ TASK 1 ---- ");
console.log(`Current Bundle: '${currentBundle.id}'`);
console.log(`Bundle Price: ${currentBundle.value}`);

/**
 *
 * Run through each index of the bundle, returning the highest price for that array
 */
const originalPrice = Object.values(currentBundle.indexKeys).reduce(
  (total, indexItems) => {
    return total + Math.max(...indexItems.map((e) => e.price));
  },
  0
);

console.log("");
console.log("");
console.log("@@ TASK 2 ---- ");
console.log(`Bundle's Original Price: ${originalPrice}`);

// Tasks:
// 1. With the above data, get the current bundle's Id and price
// 2. With the above data, get the current bundle's original price: find the highest priced product of each index, and SUM the prices up
// Requirements: Your solution needs to be generic, so if the data changes to a different bundle, your solution can still produce the correct answer
