var movies = $('li > a > div.img').parent().parent();
var ratings = movies.map((index, movie) => {
  var rating = $(movie).find('div.rate > span')[0].style.width; 
  rating = Number(rating.replace('%',''))
  var title = $(movie).find('div.tit > span')[0].textContent;
  var description = $(movie).find('div.txt')[0].textContent;
  return [[rating, title, description]];
})
ratings.sort((a,b) => -(a[0] - b[0]))
ratings.map(console.log)
