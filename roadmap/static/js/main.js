//use vue style to assemble functions, which is easier to apply further printing function.
const app = {
  // generate the main function
  main() {
    const _this = this.methods
    setTimeout(() => {
      _this.setLines()
    }, 0)
    _this.setFontSize()
    _this.dialog()
    window.onresize = () => {
      _this.setFontSize()
      _this.setLines()
    }
  },
  methods: {
    setLines() {
      let height = `${parseInt($('.root').css('height')) / 2}px`
      $('.line-lang-vertical').css({
        height: `calc(100% + ${height})`,
        top: `-${height}`
      })
    },
    //embed page
    dialog() {
      $('.href').click(function () {
        let href = $(this).attr('href')
        let html = ''
        // show image
        if (href.indexOf("png") > 0) {
          html = `<img style="width: 100vh;" src="${href}" alt="">`
        } else {
          //show text
          html = `<iframe src="${href}" width="100%" height="400px" frameborder="0">`
        }

        $('html').css({
          overflow: 'hidden',
          height: '100vh'
        })
        $('.dialog-wrapper').show()
        $('.dialog-title').text($(this).text()).css('font-size','.1.5rem')
        $('.dialog-body').html(html).contents().find('frame').css('font-size','2rem')
      })
    },
    setFontSize() {
      let whdef = 100 / 1920; // default ratio
      let wH = window.innerHeight; // current height of the window
      let wW = window.innerWidth; // current width of the window
      let rem = wW * whdef; // get fontsize according to default ratio times current widtch
      if (rem < 46.1) {
        rem = 46.1
      }
      $('html').css('font-size', rem + "px");
    },
    closed() {
      $('.dialog-wrapper').hide()
      $('html').css({
        overflow: 'auto',
        height: 'auto'
      })
    },
    selectAll() {
      $('input[type="checkbox"]').each((index, item) => {
        $(item).prop('checked',true);
      })
    },
    //add steps to roadmap
    addInput(nub) {
      let text = $(`.input-${ nub }`).val()
      // added item for certificates needs belongs to protect process which has different CSS
      if (!text) return
      let html = `
        <div class="node lang ${ nub == 1 ? 'brand arrow' : '' }">
          <span>${text}</span>
          <input type="checkbox" name="" id="" />
        </div>
      `
      //filter input to avoid invalid input
      if (!text.match(/[\w]+$/g)){
        html=""
        alert('invalid input')
      } else {
        //add new steps
        $(`.add-input-${ nub }`).append(html)
        $('#input').val('')
      }
    },

    default() {
      window.location.reload()
    },
    //apply selection to current page
    apply() {
      $('input[type="checkbox"]').each((index, item) => {
        if (!$(item).is(':checked')) {
          $(item).parent().css('opacity', 0)
        }
      })
      // hide unchecked steps
      $('.checkbox').each((index, item) => {
        let $el = $(item).find('input[type="checkbox"]')
        let length = $el.length
        let opacityLength = 0
        $el.each(($index, row) => {
          if ($(row).parent().css('opacity') == 0) {
            opacityLength++
          }
        })
        if (length == opacityLength) {
          $(item).css('opacity', 0)
        }
      })
    },
    saveAsPdf() {
      $('.btn').hide()
//      $('.add-input').hide()
      $('input[type="checkbox"]').hide()
      let html = $('.app').html()
      // to save page with loaded CSS into pdf and then save it
      html2canvas(document.querySelector(".app")).then(canvas => {
        let image = new Image();
        $('.app').html(image)
          image.src = canvas.toDataURL("image/png");
        $(image).css('width', '100%').load(() => {
          window.print();
          $('.app').html(html)
          $('.btn').show()
          $('.add-input').show()
          $('input[type="checkbox"]').show()
        })
      });
    }
  }
}
$(function () {
  app.main()
})
