function(doc) {
  if (doc.doc_type === 'dailyDelivery') {
    emit(doc.driverID, {
      packed: doc.packed
    });
  }
}
