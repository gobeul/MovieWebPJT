<template>
  <!-- <h1>예매 페이지 TicketingView</h1> -->
  <div class="container">
    <!-- 배경이미지...? -->
    <div id="ticket-container" style="border-radius: 50rem; border: 1px solid white; height: 300px;">
      <img :src="'https://image.tmdb.org/t/p/original' + movie.backdrop_path" alt="backdrop_path" style="border-radius: 50rem; border: 1px solid white">
    </div>

    <!-- {{movie}} -->
    <!-- selectedTheaterData : {{selectedTheaterData}}<br> -->
    <!-- alreadyReserved : {{$store.state.alreadyReserved}} -->
    
    <div class="d-flex flex-column">
      
      <div style="z-index: 10000;">
        <TicketingPoster :movie='movie'
          :selectedDate='selectedDate'
          :selectedTimeData='selectedTimeData'
          :selectedTheaterData='selectedTheaterData'
          @payment='payment'/>
      </div>
    
      <div class="d-flex flex-column align-items-center">
        <DatePickerSelect class="" @sendData='sendData'/>
        <!-- @reqClearResSeat='reqClearResSeat'/> -->
        <TicketingSeatSelect class="" v-show='selectedTheaterData'
        :selectedTheaterData="selectedTheaterData"
        @payment='payment'/>
      </div>
    </div>

  </div>
</template>

<script>
import TicketingPoster from '@/components/TicketingPoster'
import TicketingSeatSelect from '@/components/TicketingSeatSelect'
import DatePickerSelect from '@/components/DatePickerSelect'

export default {
  name: 'TicketingView',

  components: {
    TicketingPoster,
    TicketingSeatSelect,
    DatePickerSelect,
  },
  data() {
    return {
      // movie: this.$route.params.movie,
      // movie: this.$store.state.movieinfo,
      selectedDate: null,
      selectedTimeData: null,
      selectedTheaterData: null,
    }
  },
  methods: {
    sendData(payload) {
      this.selectedTimeData = payload.time
      this.selectedTheaterData = payload.theater
      this.selectedDate = payload.date
    },
    payment() {
      const payload = {
        date: this.selectedDate,
        time: this.selectedTimeData,
        theater: this.selectedTheaterData,
        movieId: this.movie.movie_id
      }
      this.$store.dispatch('paymentMovie', payload)
    }
  },
  computed: {
    movie() {
      return this.$store.state.movieinfo
    }
  },
  updated() {
    // 상영관 까지 다 선택했을때
    if (this.selectedTheaterData) {
      const payload = {
        date: this.selectedDate,
        time: this.selectedTimeData,
        theater: this.selectedTheaterData,
        movieId: this.movie.movie_id
      }
      this.$store.dispatch('requestSeatInfoDB', payload)
    } else {
      this.$store.dispatch('clearSeat')
    }
  },
  beforeCreate() {
    const moviePk = this.$route.params.moviePk
    this.$store.dispatch('checkMovie', moviePk)
  }
}
</script>

<style>
#ticket-container {
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 30px 30px rgba(255, 255, 255, 1), inset 0px 0 50px 30px rgba(255, 255, 255, 1);
}

#ticket-container > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  object-fit: cover;
  z-index: -1;
  opacity: 0.5;
}
</style>