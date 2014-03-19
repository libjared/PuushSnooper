// ==UserScript==
// @name        Puush Snooper
// @namespace   https://github.com/hypershadsy/
// @description lets you quickly navigate between public puush'd files for some snooping
// @match       http://puu.sh/*
// @version     0.6
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// ==/UserScript==

var charSet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; //62 chars
function navigateBy(count)
{
    //extract puush ID from URL
    var ma = "" + new RegExp("[a-zA-Z0-9]{5,}").exec(window.location.href);
    
    //ascii = ma to int[]
    var ascii = new Array();
    for (i=0;i<ma.length;i++)
    {
        ascii[i] = charSet.indexOf(ma.charAt(i));
    }
    
    //add count to ascii[ascii.length - 1]
    ascii[ascii.length - 1] += count;
    
    //do carrying
    for (i=ascii.length-1;i>=0;i--)
    {
        while (ascii[i] >= charSet.length)
        {
            ascii[i] -= charSet.length;
            ascii[i-1]++;
        }
        while (ascii[i] < 0)
        {
            ascii[i] += charSet.length;
            ascii[i-1]--;
        }
    }
    
    //perfect = ascii to string
    var perfect = "";
    for (i=0;i<ascii.length;i++)
    {
        perfect += charSet.charAt(ascii[i]);
    }
    
    //navigate to puu.sh/perfect
    window.location.href = "http://puu.sh/" + perfect;
}

var shifted = false;
$(document).bind("keyup keydown", function(e) { shifted = e.shiftKey } );
$(document).keydown(function(event)
{
    if (event.which == 37)
        if (shifted)
            navigateBy(-2);
        else
            navigateBy(-1);
    else if (event.which == 39)
        if (shifted)
            navigateBy(2);
        else
            navigateBy(1);
});
