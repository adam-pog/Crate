const Styles = theme => ({
  budget: {
    padding: theme.spacing(5),
    textAlign: 'center'
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },
  card: {
    width: 750,
    height: 60,
    margin: theme.spacing(1.5),
    backgroundColor: '#393F4A'
  },
  cardContent: {
    textAlign: 'start',
    paddingTop: 5,
    paddingRight: 0
  },
  progress: {
    margin: theme.spacing(1, 0),
    width: 550
  },
  primaryAmount: {
    flex: 1
  },
  progressBox: {
    flex: 1
  },
  progressAmount: {
    color: '#00e676'
  },
  arrow: {
    color: theme.palette.primary.light
  },
  arrowGrid: {
    margin: theme.spacing(0, 1, 0, 1),
    paddingRight: 0
  },
  arrowLink: {
    height: '24px',
    width: '24px'
  },
  mainBudgetInfoGrid: {
    margin: theme.spacing(0, 1),
  }
});

export default Styles;
