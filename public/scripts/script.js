const rows = document.querySelectorAll('.btn--edit');

rows.forEach((row) => {
  row.addEventListener('click', function (event) {
    const { id } = this.dataset;
    const rows = document.querySelectorAll(`[data-ip='${id}']`);
    const [firstRow, secondRow] = rows;
    firstRow.classList.add('table__row--hidden');
    secondRow.classList.remove('table__row--hidden');
    console.log(firstRow, secondRow)
  });
});
