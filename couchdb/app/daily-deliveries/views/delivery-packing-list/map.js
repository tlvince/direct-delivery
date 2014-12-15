function(doc) {
  if (doc.doc_type === 'dailyDelivery') {
    emit([doc._id, 0], 1);
  } else if (doc.doc_type === 'packingList') {
    emit([doc.dailyDeliveryID, 1, doc.productID], doc.expectedQty)
  }
}
