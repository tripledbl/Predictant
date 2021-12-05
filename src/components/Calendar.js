import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFWcEdtZXZ0VDVvSE1uVC01d0oyMSJ9.eyJpc3MiOiJodHRwczovL3ByZWRpY3RhbnQudXMuYXV0aDAuY29tLyIsInN1YiI6IjlWdlh3ZnBOZDlTRWkyZ1l0OEVCRXhqY1k3blJWYmxaQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3ByZWRpY3RhbnQtYmFja2VuZC5oZXJva3VhcHAuY29tL29yZGVycyIsImlhdCI6MTYzODY2NTMxMiwiZXhwIjoxNjM4NzUxNzEyLCJhenAiOiI5VnZYd2ZwTmQ5U0VpMmdZdDhFQkV4amNZN25SVmJsWiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.kjETxJwxeP81jKIfjyXkMoVFEaMzf8tjSX48Z4hBh18kELRnhKabYCzdANGGeKzSDbrTzNjw9umfSLgIrs4Ss6ZVNzUZsCnNaMVcVDIxX-cHqvVgu_ODktB3Fa01lm5GY7V99x0G8H6pFk_QqhsBcFq1zns34Rf2cYFyizC2JPFe_ZGcBJJJyhgzKUrwlvlH_VjIBgM48M5hSQqPXcs11q-Xds20WR2wFDErzRjJP4E7pD-DAlLeJQYuWFnNH4wYHArW5QX1Z1VnO4XnHCqw_sWCdOA-Y7PeKmWtcEx20wMG6Eqm24LfIwuY1FBPB428pWynxGDjWG9EMjsDSd_hhg'

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pastOrders: [] }
    }

    componentDidMount() {
        this.calendar()
    }

    calendar() {
        // get today's date
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.getOrders(today);
    }

    getOrders(today) {
        axios({
            method: 'GET',
            url: baseURL + '/orders/2021-6-1/' + today,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(dates => {
            let counts = []
            for (const date in dates.data) {
                let obj = {
                    'title': 'Order Count: ' + dates.data[date],
                    'date': date
                }
                counts.push(obj)
            }
            this.setState({ pastOrders: counts })
        });
    }

    render() {
        return(
            <FullCalendar  
                defaultView="dayGridMonth" 
                plugins={[ dayGridPlugin ]}
                events={this.state.pastOrders}
            />
        )
    }
}