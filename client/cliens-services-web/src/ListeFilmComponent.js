import * as React from 'react';
import './ListeFilmComponent.css';
import { DetailsList, DetailsListLayoutMode, SelectionMode} from 'office-ui-fabric-react/lib/DetailsList';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { initializeIcons, IIconProps } from 'office-ui-fabric-react/lib/Icons';
import { TextField } from 'office-ui-fabric-react';


const headerStyle = {
    cellTitle: {
        color: "#c71f20",
        background: "#131313"
    }
}
const caseStyle = {
    cellTitle: {
        color: "#ffffff",
        background: "#131313"
    }
}
const listStyle = {
    root:{
        background:"#131313"
    }
}

export class ListeFilmComponent extends React.Component {

    _columns;

    
    constructor(props) {
        super(props);

        this._columns = [
            { key: 'column1', name: 'Titre ', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'Description', fieldName: 'desc', minWidth: 100, maxWidth: 200, isResizable: true },

        ];

        this.state = {
            isLoaded: false,
            retourApi: "rien",
            listeFilms : [],
            listeFilmsAffichage: [],
            afficherPanelFilm: false,
            filmChoisi: null,
            urlImage:"",
            search: ""
        };
    }
    
    componentDidMount() {
        initializeIcons();
        fetch("https://localhost:44373/Home"
        ).then(res => {
            res.json().then(retourJson => {
                let listeTemp = [];
                let listeTempAffichage = [];
                retourJson.results.forEach(result => {
                    console.log(result)
                    let filmAAfficher = {styles: caseStyle, name: result.title, desc:result.overview}
                    listeTempAffichage.push(filmAAfficher)
                    listeTemp.push(result);
                })
                this.setState({
                    listeFilms: listeTemp,
                    listeFilmsAffichage: listeTempAffichage
                })
            })
        })
    }

    _onItemInvoked = (item) => {
        let listeDesFilms = this.state.listeFilms;
        listeDesFilms.forEach(film => {
            if (film.title == item.name){
                this.setState({
                    filmChoisi: film,
                    afficherPanelFilm: true,
                    urlImage : "https://www.themoviedb.org/t/p/w440_and_h660_face" + film.backdrop_path
                })
            }
        })
    }

    _onDismiss = () => {
        this.setState({
            afficherPanelFilm: false,
            filmChoisi: null,
            urlImage: ""
      })
    }

    _onClickLike = () => {
        console.log("KLIK")
    }

    _onChangeSearch = (event, newValue) =>
    {
        this.setState({
            search : newValue
        })
    }

    _onClickSearch= () => {
        let url = "https://localhost:44373/Search&query=" + this.state.search
        fetch(url).then(res => {
            res.json().then(retourJson => {
                let listeTemp = [];
                let listeTempAffichage = [];
                retourJson.results.forEach(result => {
                    console.log(result)
                    let filmAAfficher = {styles: caseStyle, name: result.title, desc:result.overview}
                    listeTempAffichage.push(filmAAfficher)
                    listeTemp.push(result);
            })
                    this.setState({
                        listeFilms: listeTemp,
                        listeFilmsAffichage: listeTempAffichage
                    })
        })
    })
}

    render() {

            if (!this.state.isLoaded){
                return (
                    
                    <React.Fragment>

                         <TextField label="Recherche" onChange={this._onChangeSearch} /><IconButton iconProps={{ iconName: 'Search' }} title="Search" ariaLabel="Search" 
                            onClick={this._onClickSearch}
                            />
                         <Panel //Panel que l'on peut fermer en cliquant partout ailleurs
                            isLightDismiss
                            isOpen={this.state.afficherPanelFilm}
                            onDismiss={this._onDismiss}
                            headerText={this.state.filmChoisi ? this.state.filmChoisi.title : ""}
                            type={PanelType.medium}

                        >
                            <IconButton iconProps={{ iconName: 'Like' }} title="Like" ariaLabel="Like" 
                            onClick={this._onClickLike}
                            /><p>3 likes</p>
                            <p>{this.state.filmChoisi ? this.state.filmChoisi.overview : ""}</p>
                            <img src={this.state.urlImage}></img>
                    </Panel>
                    
                    <DetailsList //Liste des films
                        items={this.state.listeFilmsAffichage}
                        columns={this._columns}
                        setKey="set"
                        selectionMode = {SelectionMode.none}
                        layoutMode={DetailsListLayoutMode.justified}
                        onItemInvoked={this._onItemInvoked}
                        styles={listStyle}
                    />
                    </React.Fragment>
                )
            } else {
                return (<p>yo</p>)
            }
        }


}
