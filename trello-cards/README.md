# Rename Trello card titles

More information: see the [blog post entry](https://alvarogarcia7.github.io/blog/2017/03/16/modifying-titles-in-a-trello-board/)


```javascript
//Remember to load into the console the existing code

var selectedCards = [...$('div.list-card')])

var removePrefix = card => renameCard(card, (title) => title.substring(4))

// WARNING: this performs the modification
//selectedCards.forEach(removePrefix)
```

You can also filter the cards to which apply the modification:

```javascript
//Those who match "[1]" or "[3]"
var cardsSubset = [...$('div.list-card')].filter(card => card.innerText.match(/\[[13]\]/))
```
