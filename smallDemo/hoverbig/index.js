/**
 * @author wangyiheng
 * Create Time : 2017-11-13-09-12
 * Description :
 */
(function ($) {
    var wrapper = $('.item')
    var img1 = $('.img1')
    var img2 = $('.img2')
    wrapper.mouseenter(function () {
        img1.fadeOut('slow',function () {
            img2.fadeIn('slow')
        })
    }).mouseleave(function () {
        img2.fadeOut('slow',function () {
            img1.fadeIn('slow')
        })
    })
})(jQuery)