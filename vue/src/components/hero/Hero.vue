<template>
  <div
    :class="$style.hero"
    @mouseenter="this.$store.commit('toggleDropdown', false)"
  >
    <section class="customSection" :class="heroSection">
      <div :class="$style.container">
        <div :class="$style.left">
          <h1 :class="$style.heroHeading">
            Tv kanallarını internet üzerinden kesintisiz izleyin!
          </h1>
          <p :class="$style.desc">
            Yayınları 24 saatlik aralıkta geriye alma, kanalları hd izleme, tüm
            kanallara erişim ve daha bir çok avantaj için üyelik paketlerimize
            göz atın.
          </p>
          <button
            @click="() => this.$router.push('/uyelik')"
            :class="$style.heroBtn"
          >
            Detayları Gör
          </button>
        </div>
        <div :class="$style.right">
          <img
            src="../../assets/images/banner.png"
            alt=""
            :class="$style.shareImg"
          />
          <div :class="$style.share">
            <p :class="$style.shareHeading">Diğer cihazlarınıza indirin.</p>
            <ul :class="$style.iconGroup">
              <a
                target="_blank"
                href="https://apps.apple.com/us/app/uyan%C4%B1k-tv/id483370868"
                :class="$style.linkGroup"
                ><img
                  :class="$style.shareIcons"
                  src="../../assets/share/app-store.png"
                  alt="appstore"
                />
                <span :class="$style.shareTitle">App Store</span>
              </a>
              <a
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.makersoft.uyaniktv&hl=tr&gl=US"
                :class="$style.linkGroup"
              >
                <img
                  :class="$style.shareIcons"
                  src="../../assets/share/google-play.png"
                  alt="googleplay"
                />
                <span :class="$style.shareTitle">Google Play</span>
              </a>

              <a
                target="_blank"
                href="https://play.google.com/store/apps/details?id=tv.euroturk.uyaniktvbox&hl=tr&gl=US"
                :class="$style.linkGroup"
              >
                <img
                  :class="$style.shareIcons"
                  src="../../assets/share/smart-tv.png"
                  alt="googleplay"
                />
                <span :class="$style.shareTitle">Tv box</span>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {};
</script>

<style module>
.hero {
  background-color: #f8f5f5;
}

.container {
  display: flex;
}

/* left */
.left {
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: left;
  row-gap: 2rem;
}

.heroHeading {
  font-size: 3.5rem;
  letter-spacing: 1px;
  color: var(--color-divider-bg);
  line-height: 60px;
}

.desc {
  font-size: var(--font-size-xl);
  color: var(--color-brand);
}

.heroBtn {
  padding: 0.75rem 1.5rem;
  margin-right: auto;
  font-size: var(--font-size-l);
  border-radius: var(border-radius-sm);
  font-weight: 500;
  background: rgb(184, 46, 31);
  color: var(--color-white);
}

.right {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 2rem;
}

.share {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 1rem;
  margin-top: 2rem;
  margin-right: 2rem;
}

.shareImg {
  margin-top: 12px;
}

.shareHeading {
  font-size: var(--font-size-xl);
  font-weight: 500;
  color: var(--color-brand);
  margin: 0 auto;
}

.iconGroup {
  display: flex;
  column-gap: 2rem;
}

.shareIcons {
  width: 30px;
  height: 30px;
}

.shareTitle {
  color: var(--color-white);
  font-weight: 600;
}

.linkGroup {
  display: flex;
  align-items: center;
  column-gap: 0.3rem;
  padding: 0.5rem;
  background: rgb(65, 65, 65);
  border-radius: 5px;
  border: 3px solid var(--color-gray);
}

/* media querys */

@media screen and (max-width: 1068px) {
  .container {
    flex-direction: column;
    row-gap: 3rem;
  }

  .left {
    text-align: center;
  }

  .heroBtn {
    margin: 0 auto;
  }

  .right {
    align-items: center;
  }

  .share {
    margin-right: 0px;
  }

  .heroHeading {
    font-size: 2rem;
    line-height: 36px;
  }

  .desc {
    font-size: var(--font-size-l);
  }

  .heroBtn {
    font-size: var(--font-size-sm);
  }
  .shareTitle {
    font-size: var(--font-size-sm);
  }

  .shareImg {
    width: 100%;
  }
}
</style>
