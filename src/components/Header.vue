<template>
  <div class="header">
    <h1>{{title}}</h1>
    <h4>How much of your favourite song consists of swear words? Search it up here to find out!</h4>
    <h4>(Disclaimer: it can't detect context, or idioms, or wordplay. You're in charge to figure out whether to play it in front of your parents or not.)</h4>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String
  }
}
</script>


<style scoped>
.header{
  font-size:1.25em;
  margin:1em;
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
}
h1{
  font-weight: 800;
  font-size:3.3em;
  line-height:.6em;
}
h4,h6{
  margin:.5rem;
  width:80%;
}
</style>
