function (doc, req) {
	var startDate = new Date(req.query.date);
	return ((doc.doc_type && (doc.doc_type === 'dailyDelivery' || doc.doc_type === 'kpi' || doc.doc_type === 'packingList'))
	&& (req.query.driverId === doc.driverID)
	&& (startDate <= new Date(doc.date)));
}