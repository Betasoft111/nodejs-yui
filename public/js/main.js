
// YUI().use('paginator', 'node', 'datatype-number-format', function (Y) {
//     // node references
//     // var newTitle = JSON.parse('{{title | raw | json}}');
//     // console.log('Logg' , newTitle);
//     var demo = Y.one('#demo'),
//         tbody = demo.one('tbody'),
//         controls = demo.one('.controls'),

//         // templates
//         rowTemplate = '<tr><td>{count}</td><td>{NAME}</td><td>{Email}</td><td >{ADDRESS}</td><td >{PNumber}</td></tr>',
//         currentPageTemplate = 'Page {page} of {totalPages}',

//         // data to display
//         data = [
//             { NAME: "Randhir Singh", Email: "randhir@betasoftsystems.com", ADDRESS: "Chandigarh",  PNumber: "1234567890" },
//         ],

//         // paginator
//         pg = new Y.Paginator({
//             itemsPerPage: 10,
//             totalItems: data.length
//         });

//     // let's do a one time pass through the data to format the population numbers
//     Y.Array.each(data, function (val, key) {
//         val.population = Y.Number.format(val.population, {thousandsSeparator: ','});
//     });


//     Y.one('#demo').delegate('click', function (e) {
//         e.preventDefault();

//         var control = e.currentTarget,
//             type = control.getData('type');

//         if (control.hasClass('disabled')) {
//             return;
//         }

//         switch (type) {
//             case 'first': pg.set('page', 1); break;
//             case 'prev': pg.prevPage(); break;
//             case 'next': pg.nextPage(); break;
//             case 'last': pg.set('page', pg.get('totalPages')); break;
//         }

//     }, '.control');

//     Y.one('#demo .perPage').on('change', function (e) {
//         pg.set('itemsPerPage', e.currentTarget.get('value'));
//     });


//     function showPage(page) {
//         // get the page number from the paginator if there isn't one provided
//         page || (page = pg.get('page'));

//         // number of items to display
//         var itemsPerPage = pg.get('itemsPerPage'),
//             totalItems = pg.get('totalItems') - 1,
//             min = (page - 1) * itemsPerPage,
//             max = Math.min( (page * itemsPerPage) - 1, totalItems),
//             rows = '',
//             i;

//         // if our math left us with less than the minimum, use the total number of items
//         if (max < min) {
//             max = totalItems;
//         }

//         // loop through the data and build the templates
//         for (i = min; i <= max; i++ ) {
//             rows += Y.Lang.sub(rowTemplate, Y.mix({count: i + 1}, data[i]));
//         }

//         // set the table's body to the new rows
//         tbody.setHTML(rows);

//         // update the paginator's display
//         Y.all('.currentPage').set('text',
//             Y.Lang.sub(currentPageTemplate, pg.getAttrs())
//         );
//     }

//     function updateControls() {
//         var hasNext = pg.hasNextPage(),
//             hasPrev = pg.hasPrevPage();

//         controls.one('.control-first a').toggleClass('disabled', !hasPrev);
//         controls.one('.control-prev a').toggleClass('disabled', !hasPrev);
//         controls.one('.control-next a').toggleClass('disabled', !hasNext);
//         controls.one('.control-last a').toggleClass('disabled', !hasNext);
//     }

//     pg.after('itemsPerPageChange', function () {
//         if (pg.get('page') === 1) {
//             showPage();
//             updateControls();
//         } else {
//             pg.set('page', 1);
//         }
//     });

//     pg.after('pageChange', function (e) {
//         showPage(e.newVal);
//         updateControls();
//     });

//     showPage();
//     updateControls();

// });