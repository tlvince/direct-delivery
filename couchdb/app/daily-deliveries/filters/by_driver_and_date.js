function(doc, req) {
  var reqDate = new Date(req.query.date);
  return ((doc.doc_type && doc.doc_type === 'dailyDelivery' )
    && (req.query.driverId === doc.driverID)
    && (reqDate.getTime() === new Date(doc.deliveryDate).getTime()));
}

