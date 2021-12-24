async function denormalize(database){
    const snapshots = await database.ref('orders').get();
//     const snapshots = await ordersRef.once('value');
    snapshots.forEach(snap => {
        console.log(snap.val().email);
//         console.log(snap.data());

    })
}

denormalize(window.database);