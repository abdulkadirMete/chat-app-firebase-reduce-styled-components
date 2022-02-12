import { createGlobalStyle } from "styled-components";
import { radius, shadows } from "./Variable";

export const GlobalStyle = createGlobalStyle`


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    height: 100vh;
}

/* Globals */

ul{
    list-style: none;
}

a{
    text-decoration: none;
}
    

.btn{
    color: white;
    background-color: purple;
    border:none;
    padding: .5rem .75rem;
    border-radius:${radius.radiusMin};
    box-shadow:${shadows.shadowLight};

    &:hover{
        opacity: .9;
    }

}

.input{
    padding: .5rem .75rem;
    padding-left: 2rem;
    border-radius: .25rem;
    border: 1px solid grey;
    box-shadow:${shadows.shadowLight};
    
    &:focus{
        outline-color:grey;
    }
}

svg{
    width: 16px;
}


`;
