import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

const items = [
    {description: "Bienvenido a VENDAPUES! en estos momentos estamos trabajando en la página, vuelva pronto!",responsible: {name: "VendaPues!",email: "admin"}}
]

class MainViewCards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid className={classes.grid}>
                {items.map((task,index) => {
                    return (
                        <center key={index}>
                        <Grid >
                            <Card className={classes.root}>
                            <CardActionArea>
                                <CardHeader
                                    avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {task.status === "Listo" && <AlarmOnIcon fontSize = "large" className={classes.statusReady}/>}
                                        {task.status === "Completo" && <CheckCircleIcon fontSize = "large" className={classes.statusCompleted}/>}
                                        {task.status === "Ejercitandose" && <AutorenewIcon fontSize = "large" className={classes.statusInProgress}/>}
                                    </Avatar>
                                    }
                                    title={
                                    <Typography gutterBottom variant="h5" component="h2">
                                                {task.description}
                                    </Typography>}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {task.status}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {task.dueDate}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {task.responsible.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            </Card>
                        </Grid>
                        </center>
                    )
                })}
            </Grid>
        )
    }
}



const styles = theme => ({
    root: {
        maxWidth: 800,
        marginBottom: "50px",
    },
    grid: {
        alignContent: "center",
        alignItems: "center",
    },
    avatar: {
        backgroundColor: "#FFFFFF",
    },
    statusReady: {
        color: "#0071EA",
    },
    statusCompleted: {
        color: "#3CCA0A",
    },
    statusInProgress: {
        color: "#DA4B15",
    },
});


export default withStyles(styles, { withTheme: true })(MainViewCards);