function searchWiki() {
    const searchStr = $('#search-box').val();
    console.warn('call API to search for', searchStr);
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch='+ searchStr + '&gsrnamespace=0&gsrlimit=5',
        dataType: 'jsonp',
        type: 'POST',
        headers: {
            'Api-User-Agent': 'FreeCodeCamp student: https://www.freecodecamp.com/coleman415',
        },
        success: function(data) {
            console.warn('API Success');
            const pagesArray = Object.keys(data.query.pages);
            console.warn('pagesArray', pagesArray);
            const idcodes = [];
            const titles = [];
            console.warn('Accessing object index 0 in pagesArray',
            data.query.pages[pagesArray[0]]);
            $('#results').fadeIn(2000);
            for (i = 0; i < pagesArray.length; i++) {
                idcodes[i] = data.query.pages[pagesArray[i]].pageid;
                titles[i] = data.query.pages[pagesArray[i]].title;
                const divId = '#result' + i;
                const link1 = '<a href="https://en.wikipedia.org/?curid=';
                const link2 = '" target="_blank">';
                const link3 = '</a>';
                $(divId).html(link1 + idcodes[i] + link2 + titles[i]
                  + link3).fadeIn(2000);
            };
            console.warn('idcodes array', idcodes);
            console.warn('titles array', titles);
        },
    });
};

function randomWiki() {
  $('#randomBtn').click(function() {
    window.open('https://en.wikipedia.org/wiki/Special:Random');
  });
};

$(document).ready(() => {
  $('#results').hide();
  randomWiki();
  $('#searchBtn').click(searchWiki);
  $('#search-box').keypress((e) => {
    if (e.which == 13) {
      searchWiki();
    }
  });
});
