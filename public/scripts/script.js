const rows = document.querySelectorAll('.btn--edit');
const btns = document.querySelectorAll('.btn');

rows.forEach((row) => {
  row.addEventListener('click', function (event) {
    const { id } = this.dataset;
    const rows = document.querySelectorAll(`[data-ip='${id}']`);
    const [firstRow, secondRow] = rows;
    firstRow.classList.add('table__row--hidden');
    secondRow.classList.remove('table__row--hidden');
    console.log(firstRow, secondRow);
  });
});

btns.forEach((btn) => {
  btn.addEventListener('click', function () {

    const { action } = this.dataset;
    const parent = this.parentElement;

    if (action === 'add') {
      parent.action = '/add-supply';
      parent.submit();
    } else {
      parent.action = '/remove-supply';
      parent.submit();
    }
  });
});
