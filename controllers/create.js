async function createListing(client, newListing){
    const result = await client.db("COM519").collection("bmw_pricing_challenge").InsertOne(newListing);
    console.log("New listing created with the following id: ", result.insertedId);
  }