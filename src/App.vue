<template>
  <div id="app">
    <Header v-if="!$route.meta.hideFlag"></Header>
    <div class="main clearfix">
      <Nav v-if="!$route.meta.hideFlag" class="left nav"></Nav>
      <router-view class="view"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/header";
import Nav from "./components/nav";

export default {
  name: "App",
  components: {
    Header,
    Nav,
  },
  mounted() {
    this.$websocket.init();
    let that = this;
    setTimeout(function(){
      let d = '{"M":"login","ID":"19158","K":"f09213980f"}\n';
      that.$websocket.send(d);
    },2000)
  },
};
</script>

<style>
.nav {
  width: 250px;
  margin-right: 20px;
}
.view {
  min-width: 1450px;
}

/* ------------------------------------------------- */

.left {
  float: left;
}

.right {
  float: right;
}

.clearfix:after {
  content: "";
  display: block;
  visibility: hidden;
  clear: both;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

/* 重置文本框 */
input,
button {
  border: none;
  outline: none;
  outline-offset: 0;
}

/* 重置按钮 */
button {
  background: initial;
  padding: 0;
}
</style>

