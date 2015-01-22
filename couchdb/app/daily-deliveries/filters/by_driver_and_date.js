function(doc, req) {
  var reqDate = req.query.date;
  return ((doc.doc_type && doc.doc_type === 'dailyDelivery' )
    && (req.query.driverId === doc.driverID)
    && (reqDate === doc.date));
}

