import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { getDailyOrder } from '../../Redux/Actions/dailyOrderSummaryAction';
import { tableCustomStyles } from '../../Shared/Constants/Constant';
import "./Dashboard.css"

function DailyOrderSummary() {
    const dailyOrder = useSelector(state => state.dailyOrder.dailyOrder)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDailyOrder())
    }, [])

    const columns = [
        {
            name: "User Name",
            selector: row => row?.FirstName + " " + row?.LastName,
            minWidth: '120px',
            wrap: true,
        },
        {
            name: "Total Order",
            selector: row => row?.TotalOrder,
            center: true,
            minWidth: '125px',
            maxWidth: '130px',
        },
        {
            name: "Confirmed",
            center: true,
            selector: row => row?.OrderConfirmed,
            minWidth: '120px',
            maxWidth: '130px',
        },
        {
            name: "Dispatched",
            center: true,
            selector: row => row?.OrderDispatched,
            minWidth: '125px',
            maxWidth: '130px',
        },
        {
            name: "Received",
            center: true,
            selector: row => row?.OrderReceived,
            minWidth: '105px',
            maxWidth: '115px',
        },
        {
            name: "Pending",
            center: true,
            selector: row => row?.PendingOrder,
            minWidth: '100px',
            maxWidth: '110px',
        }
    ]
    return (
        <>
            <div className='w-100 p-3' style={{ height: '90%', minHeight:'300px'}}>
                <h5 className='px-2'>Daily Order Summary</h5>
                <div className='d-flex flex-column justify-content-between' style={{ height: '90%' }}>
                    <DataTable
                        columns={columns}
                        data={dailyOrder}
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

export default DailyOrderSummary