export const ImagePath = 'https://api-oms.softclues.in/StaticFiles/'
export const Capitalize = (value) => {
    const words = value?.split(" ");

    for (let i = 0; i < words?.length; i++) {
        words[i] = words[i][0]?.toUpperCase() + words[i]?.substr(1);
    }
    return words?.join(' ')
}
export const dashboardWidth = (value) => {
    let width = getComputedStyle(document.documentElement).getPropertyValue('--dashboard-width')
    if (value) {
        if (width == '250px') {
            document.documentElement.style.setProperty('--dashboard-width', '100px')
            document.documentElement.style.setProperty('--sidebar-width', '100px')
        } else {
            document.documentElement.style.setProperty('--dashboard-width', '250px')
            document.documentElement.style.setProperty('--sidebar-width', '250px')
        }
    }
    return width == '250px' ? true : false;
}

export const calculateSum = (lst, field) => lst.map(o => o[field]).reduce((a, c) => { return Number(a) + Number(c) })

export const tableCustomStyles = {
    headRow: {
        style: {
            fontWeight: 'bold',
            color: 'white',
            background: '#212529',
            minHeight: '50px',
        },
    },
    rows: {
        style: {
            minHeight: '35px',
            padding: "0",
        }
    },
    pagination: {
        style: {
            minHeight: '10px',
            justifyContent: 'center'
        }
    }
}
export const tableCustomStyles2 = {
    headRow: {
        style: {
            minHeight: '50px',
            fontWeight: 'bold',
            color: 'white',
            background: '#212529',
        },
    },
    rows: {
        style: {
            minHeight: '35px',
        }
    },
    pagination: {
        style: {
            minHeight: '10px'
        }
    }
}

export const conditionalRowStyles = [
    {
        when: rows => rows.PartyName == "Order Summary",
        style: {
            backgroundColor: 'lightgray',
            color: 'black',
            fontWeight: 'bold',
            minHeight: '35px',
        },
        headRow: {
            style: {
                fontWeight: 'bold',
                color: 'white',
                minHeight: '50px',
                background: 'radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(64, 64, 64) 90.2%)',
            },
        },
        pagination: {
            style: {
                minHeight: '10px'
            }
        }
    },
    {
        when: rows => rows.PartyName != "Order Summary",
        style: {
            backgroundColor: '',
            minHeight: '35px',
        },
        headRow: {
            style: {
                fontWeight: 'bold',
                color: 'white',
                minHeight: '50px',
                background: 'radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(64, 64, 64) 90.2%)',
            },
        },
        pagination: {
            style: {
                minHeight: '10px'
            }
        }
    },
];

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export const DateSplit = (date) => {
    if (date) {
        return date.split('T')[0]
    }
}
export const roundValue = (data) => {
    return (Math.round((Number(data) + Number.EPSILON) * 100) / 100).toFixed(2)
}