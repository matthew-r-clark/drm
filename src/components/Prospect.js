import styled from '@emotion/styled';
import { DesktopOnly } from './MediaQuery';
const Prospect = ({instance}) => {
    const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-left: 1rem;
    `;
    return ( 
        <Grid>
            <h4>{instance.first_name}</h4>
            <h4>{instance.last_name}</h4>
            <h4>{instance.notes}</h4>
        </Grid>
       
     );
}
 
export default Prospect;