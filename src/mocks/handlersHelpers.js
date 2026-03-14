export const getPaginatedResponseGET_OLD = (args, items, pageSize = 10) => {

    console.log("dem args", args)
    const url = new URL(args.request.url)
    //const body = await args.request.clone().json()
    //const { data: { userId, cursor, limit } } = body
    const input = url.searchParams.get("input")

    const { userId, cursor, limit } = JSON.parse(input)

    console.log(userId, cursor, limit)

    //const pageSize = 10;
    // 3. Determine start index
    // If no cursor, start at 0. Otherwise, parse cursor (e.g., as index)
    const startIndex = cursor ? parseInt(atob(cursor), pageSize) : 0;
    const endIndex = startIndex + pageSize;

    /* const blaId = "699db95c431033ab91554751"
    const fooItems = items.map(x => {
        const meh = Object.assign({}, { ...x }, {
            buyerId: x.buyerId == blaId ? userId : x.buyerId,
            sellerId: x.sellerId == blaId ? userId : x.sellerId
        })
        return meh
    }) */
    // 4. Slice data
    const pageItems = items.slice(startIndex, endIndex);

    // 5. Generate next cursor (using base64 to treat it as an opaque token)
    const nextCursor = endIndex < items.length
        ? btoa(endIndex.toString())
        : null;

    const fooResponse = { "result": { "data": { "items": pageItems, "nextCursor": nextCursor } } }

    return fooResponse
}

export const getPaginatedResponseGET = async (args, fooItems, key1, key2, returnKey) => {

    console.log("dem args", args)
    const url = new URL(args.request.url)
    //const body = await args.request.clone().json()
    //const { data: { userId, cursor, limit } } = body
    const input = url.searchParams.get("input")
    console.log(url, JSON.parse(input))
    const { [key1]: id, cursor, limit } = JSON.parse(input)

    const blaItems = [...fooItems].map(x => returnKey ? ({ [returnKey]: x[returnKey] }) : x)

    //const pageSize = 10;
    // 3. Determine start index
    // If no cursor, start at 0. Otherwise, parse cursor (e.g., as index)
    const startIndex = cursor ? parseInt(atob(cursor), 10) : 0;
    const endIndex = startIndex + limit;

    // 4. Slice data
    const pageItems = blaItems.slice(startIndex, endIndex);

    // 5. Generate next cursor (using base64 to treat it as an opaque token)
    const nextCursor = endIndex < blaItems.length
        ? btoa(endIndex.toString())
        : null;

    const fooResponse = { "result": { "data": { "items": pageItems, "nextCursor": nextCursor } } }

    return Promise.resolve(fooResponse)
}

export const getPaginatedResponsePOST = async (args, fooItems, key1, key2, returnKey) => {
    const body = await args.request.clone().json()
    console.log({ body }, key1, key2, returnKey, { fooItems })
    const items = Object.keys(body).map(key => {
        const item = body[key]
        const { [key1]: id, limit: foolimit, cursor } = item
        //console.log(key1, key2, id, limit, cursor)

        const limit = foolimit //|| 0//|| pageSize

        const blaItems = fooItems.filter(x => x[key2] == id).map(x => returnKey ? ({ [returnKey]: x[returnKey] }) : x)
        const startIndex = cursor ? parseInt(atob(cursor), 10) : 0;
        const endIndex = startIndex + limit;
        //console.log(blaItems, cursor, startIndex, endIndex)
        const pageItems = blaItems.slice(startIndex, endIndex);
        //console.log(startIndex, endIndex, pageItems)
        const nextCursor = endIndex < blaItems.length
            ? btoa(endIndex.toString())
            : null;
        return { "result": { "data": { "items": pageItems, "nextCursor": nextCursor } } }
    })

    return Promise.resolve(items)
}

export const getUsersByCountryBatched = async (args, fooItems) => {
    const body = await args.request.clone().json()
    
    const items = Object.keys(body).map(key => {
        const item = body[key]
        const { countryId, limit: foolimit, cursor } = item
        const limit = foolimit //|| 0//|| pageSize
        const blaItems = fooItems.find(x => x.countryId == countryId).items
        const startIndex = cursor ? parseInt(atob(cursor), 10) : 0;
        const endIndex = startIndex + limit;
        const pageItems = blaItems.slice(startIndex, endIndex);
        const nextCursor = endIndex < blaItems.length
            ? btoa(endIndex.toString())
            : null;
        return { "result": { "data": { "items": pageItems, "nextCursor": nextCursor } } }
    })

    return Promise.resolve(items)
}

export const getUserLiteBatched = async (args, fooItems) => {
    const body = await args.request.clone().json()
    const items = Object.keys(body).map(key => {
        const userId = body[key].userId
        const user = fooItems.find(x => x._id == userId)
        return { "result": { "data": user } }
    })
    return Promise.resolve(items)
}

export const getUpgradeByTypeAndEntityPOST = async (args, allUpgrades, key1, key2) => {
    const body = await args.request.clone().json()
    const items = Object.keys(body).map(key => {
        const item = body[key]
        const { [key1]: id, upgradeType } = item
        const blaItem = allUpgrades.find(x => x[key2] == id && x.upgradeType == upgradeType)//.map(x => returnKey ? ({ [returnKey]: x[returnKey] }) : x)

        const a = { "result": { "data": blaItem } }
        const b = { "result": { "error": {} } }
        return blaItem ? a : b
        //return { "result": { "data": { "items": pageItems, "nextCursor": nextCursor } } }
    })
    //console.log({items})
    const bla = items//.filter(x => x.result?.data).map(x => x.result.data)//.filter(x => x.result.data.items.length)//.map(x => x.result.data)
    return Promise.resolve(bla)
}