export default {
  computed: {
    pomodoroList: () => [
      {
        text: '15 minutes',
        value: 0.25
      },
      {
        text: '30 minutes',
        value: 0.5
      },
      {
        text: '45 minutes',
        value: 0.75
      },
      {
        text: '1 hour',
        value: 1
      },
      {
        text: '1 hour and half',
        value: 1.5
      }
    ]
  }
}
