import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { tableCustomStyles } from '../../Shared/Constants/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { getConfirmOrder } from '../../Redux/Actions/ConfirmOrdersAction';
import { getAuthLoginUser } from '../../Services/AuthService/AuthService';
import moment from 'moment';
import { roundValue } from '../../Shared/Constants/Constant';

function DuePayment() {
    const allOrders = useSelector(state => state.confirmOrders.confirmOrders);
    const [loginUser, setloginUser] = useState(getAuthLoginUser())

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getConfirmOrder(loginUser))
    }, [])

    const columns = [
        {
            name: 'Party',
            selector: row => row?.PartyName,
            width:'200px',
        },
        {
            name: 'Invoice',
            selector: row => row?.InvoiceNo,
        },
        {
            name: 'TrnDate',
            selector: row => moment(row.TrnDate).format('DD-MM-YYYY'),
            allowOverflow : true
        },
        {
            name: 'DueDate',
            selector: row => moment(row.PaymentDate).format('DD-MM-YYYY'),
            allowOverflow : true
        },
        {
            name: 'DueDays',
            selector: row => row.DueDays,
        },
        {
            name: 'Amount',
            selector: row => roundValue(row?.Amount),
        },
        {
            name: 'Payment',
            selector: row => roundValue(row.PaymentAmount),
        },
        {
            name: 'Remaining',
            selector: row => roundValue(row?.RemaningAmount),
        }

    ]

    return (
        <>

            <div className='w-100 h-auto'>
                <h5 className='px-2 pt-2'>Due Payment</h5>
                <div>
                    <DataTable
                        columns={columns}
                        data={allOrders}
                        pagination
                        paginationPerPage={6}
                        paginationRowsPerPageOptions={[6, 10, 15, 20]}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Records per page:',
                            rangeSeparatorText: 'out of',
                        }}
                        fixedHeader
                        customStyles={tableCustomStyles}
                    //  subHeader={props.filterField ? getSubHeaderComponent() : false}
                    // subHeaderComponent={props.filterField ? getSubHeaderComponent() : false}
                    />
                </div>
            </div>

        </>
    )
}

export default DuePayment