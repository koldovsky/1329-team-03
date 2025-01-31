setTimeout(() => {
  const listItem = document.querySelectorAll('.filters__item');

  console.log(listItem);

  listItem.forEach((list) => {
    list.addEventListener('click', () => {
      console.log(list);
      list
        .querySelector('.filters__item-category')
        .classList.toggle('filters__item-category--show-list');
    });
  });
}, 2000);
