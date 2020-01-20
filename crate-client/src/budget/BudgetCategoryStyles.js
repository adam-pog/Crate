const Styles = theme => ({
  budget: {
    padding: theme.spacing(5),
    textAlign: 'center'
  },
  addButton: {
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark
    },
    marginTop: 20
  },
  backButton: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
    "&:hover $backIcon": {
      color: '#282c34'
    },
    marginLeft: 10
  },
  backIcon: {
    color: theme.palette.secondary.main
  },
  addIcon: {
    color: '#282c34'
  },
  card: {
    width: 750,
    height: 60,
    margin: theme.spacing(1.5),
    backgroundColor: '#393F4A'
  },
  transactionCard: {
    width: 750,
    height: 150,
    margin: theme.spacing(1.5),
    backgroundColor: '#393F4A'
  },
  cardHeader: {
    textAlign: 'start',
    backgroundColor: theme.palette.primary.dark
  },
  cardHeaderText: {
    margin: theme.spacing(0, 0, 0, 1),
  },
  cardContent: {
    textAlign: 'start',
    paddingTop: 5,
    paddingRight: 0
  },
  progress: {
    margin: theme.spacing(1, 0),
    width: 650
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