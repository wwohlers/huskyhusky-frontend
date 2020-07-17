<template>
  <div id="about">
    <h1>About the Husky Husky</h1>
    <p>We are a small online satire magazine run by Northeastern students. Please don't leave.</p>
    <p>
      ​How can we best describe ourselves? Well, let's see. You know the mayonnaise they serve in the dining halls? You know how it just sits there under the heat lamps all day and by the time you take some and put it on your plate it doesn't really taste or act like mayonnaise anymore? That is us. The Husky Husky!! We're not what you expected when you tried us and it really wasn't worth it in the first place.
    </p>
    <p>
      Our writing is generally absurdist and satirical, but anything that makes us laugh will get published. Generally, we try to find humor in local school issues.  Northeastern takes itself too seriously - and there's a lot of good comedy that springs up from that simple fact.
    </p>
    <div class="three-tile">
      <div class="tile">
        <a href="https://www.patreon.com/user?u=34790035&fan_landing=true"
          target="_blank">
          <img class="tile-thumb" src="../assets/patreon.png" />
          <p class="tile-title">
            Patreon
          </p>
        </a>
      </div>
      <div class="tile">
        <a href="https://docs.google.com/forms/d/1-BNGDS9ixzgqtM4XVMzrXhsAvYs6CjNZMTwUnf6iFVE/edit#response=ACYDBNiKRCvHHKAGrMH32_IMd9PR9hOqDvUdn6sCuHzeNNPOije9bnexbE4nGEDQaDlgle0"
          target="_blank">
          <img class="tile-thumb" src="../assets/write.png" />
          <p class="tile-title">
              Write for Us
          </p>
        </a>
      </div>
      <div class="tile">
        <a 
          href="https://www.patreon.com/user?u=34790035&fan_landing=true"
          target="_blank">
          <img class="tile-thumb" src="../assets/idea.png" />
          <p class="tile-title">
              Got an idea?
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'About'
  },
  name: 'About'
}
</script>

<style scoped>
.three-tile {
  width: 80%;
  max-width: 800px;
  margin: 2em auto 0 auto;
  display: flex;
  justify-content: space-between;
}

.tile {
  flex: 1;
  margin: 1em;
  padding: 2em;
  border-radius: 4px;
  border-top: 1px solid #9e5c5c;
  box-shadow: 0 0 12px #BBBBBB;
  cursor: pointer;
  transition: 0.5s;
}

.tile:hover {
  box-shadow: 0 0 24px #AAAAAA;
}

.tile > a {
  text-decoration: none;
}

.tile-title {
  font-family: 'Raleway';
  font-size: 28px;
  text-transform: uppercase;
  margin: 0;
}

.tile-title {
  color: #444444;
}

.tile-thumb {
  width: 40%;
  margin: auto;
  margin-bottom: 1em;
}

@media only screen and (max-width: 1024px) {
  .three-tile {
    flex-direction: column;
  }
}
</style>