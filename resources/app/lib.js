// -----------------------------------------------------------------------------------------

function JSON_fromString(str)
{
   var ret={};
   try { ret=JSON.parse(str); } catch (e) { console.log(e); };
   return ret;
}

function JSON_toString(obj)
{
   return JSON.stringify(obj);
}

// -----------------------------------------------------------------------------------------

function storage_save(key,val)
{
   if (typeof val === "undefined") return;
   localStorage.setItem(key, JSON_toString(val));
}

function storage_load(key,default_value)
{
   var val=localStorage.getItem(key);
   if (typeof val == "undefined" || val == null) { val=default_value; storage_save(key,val); }
   else val=JSON_fromString(val);
   return val;
}

// -----------------------------------------------------------------------------------------

function settext(element,t,active)
{
   var el=$('#'+element);
   if (el.text()==t) return false;
   el.text(t);
   if (active) el.addClass('active'); else el.removeClass('active');
   return true;
}

function sethtml(element,h)
{
   var el=$('#'+element);
   if (el.data('rawhtml')==h) return false;
   el.html(h);
   el.data('rawhtml',h);
   return true;
}

function num(n,precision,strip)
{
   if (!precision) precision=0;
   n=parseFloat(n);
   if (isNaN(n)) n=0;
   n=n.toFixed(precision);
   if (strip && precision>0) n=n.replace(/0+$/,"").replace(/[.]$/,"");
   return n;
}

function htmlspecialchars(text)
{
   if (typeof text == "undefined") return '';
   text=text+"";
   var map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
   return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function humanReadableDate(d)
{
   return (new Date(d*1000)).toLocaleString();
}

function UCfirst(str)
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function now(miliseconds)
{
   var n=Date.now();
   if (miliseconds) return n;
   else return Math.floor(n/1000);
}

function timeAgo(t)
{
   function plural(n) { if (n>1 || n==0) return "s"; else return ""; }
   var length=now()-t;

   var days=length/60/60/24;
   var hours=(days-Math.floor(days))*24;
   var minutes=(hours-Math.floor(hours))*60;

   var weeks=Math.floor(days/7);
   var months=Math.floor(days/30);
   var years=Math.floor(days/365);

   days=Math.floor(days);
   hours=Math.floor(hours);
   minutes=Math.floor(minutes);

   if (years>0) return years+" year"+plural(years)+" ago";
   if (months>0) return months+" month"+plural(months)+" ago";
   if (weeks>0) return weeks+" week"+plural(weeks)+" ago";
   if (days>0) return days+" day"+plural(days)+" ago";
   if (hours>0) return hours+" hour"+plural(hours)+" ago";
   if (minutes>0) return minutes+" minute"+plural(minutes)+" ago";
   return "a while ago";
}

// -----------------------------------------------------------------------------------------

function sortByKeys(ar,sortkeys,desc)
{
   var keys=[];
   var x,y,i,j;
   if (desc) desc=-1; else desc=1;

   return ar.sort( function(a, b)
   {
      for (i=0; i<sortkeys.length; i++)
      {
         x=undefined; y=undefined;
         keys=sortkeys[i].split("|");
         for (j=0; j<keys.length; j++) { if (!x) x=a[keys[j]]; }
         for (j=0; j<keys.length; j++) { if (!y) y=b[keys[j]]; }
         if (x<y) return -1*desc;
         if (x>y) return 1*desc;
      }
      return 0;
   });
}

function makeOrderedArray(obj,sortkeys,idname)
{
   var res=[]; var el;
   for (var i in obj)
   {
      el=obj[i];
      if (idname) el[idname]=i;
      res.push(el);
   }
   return sortByKeys(res,sortkeys);
}
