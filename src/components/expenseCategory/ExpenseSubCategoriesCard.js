import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const ExpenseSubCategoriesCard = (props) => {
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        setFilteredData(props.expense.allExpensesSubCategories.filter(item => item.parentCategory === props.item.id))
    }, [props.expense.allExpensesSubCategories])

    return <div style={{ height: 220, backgroundColor: '#F5F5F5', display: 'flex', paddingBottom: 15, position: 'relative', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', width: '85%', overflowY: 'scroll'}}>
        {
            filteredData.length > 0 ? filteredData.map(itm => {
                return <div key={itm.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 10,  }}>
                <div style={{ width: 6, height: 6, backgroundColor: '#888888', borderRadius: 3 }}></div>
                <label style={{ marginLeft: 6 }}>{itm.name}</label>
            </div> 
            }): <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '85%', marginTop: 10, marginBottom: 41 }}>

                <label style={{ marginLeft: 6 }}>N/A</label>
            </div>
        }
        </div>
        <div style={{ width: '100%', height: '0.5px', position: 'absolute', bottom: 40, backgroundColor: '#CFCFCF' }}></div>
        <div style={{ width: '100%', height: 40, backgroundColor: '#F3F3F3', position: 'absolute', bottom: 0, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={() => {
            props.addNewSubCategoryEvent(props.item.id)
        }}>
            <label style={{ fontSize: 12, cursor: 'pointer' }}>Add Sub Category</label>
        </div>
    </div>
    //   }) 

    //   : <div style={{height: 220, backgroundColor: '#F5F5F5', display: 'flex', paddingBottom: 15, position: 'relative', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
    //   <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '85%', marginTop: 10, marginBottom: 41}}>

    //     <label style={{marginLeft: 6}}>N/A</label>
    //   </div>
    //   <div style={{width: '100%', height: '0.5px', position: 'absolute', bottom: 40, backgroundColor: '#CFCFCF'}}></div>
    //   <div style={{width: '100%', height: 40, backgroundColor: '#F3F3F3', position: 'absolute', bottom: 0, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}} onClick={() => {
    //     props.addNewSubCategoryEvent(props.item.id)
    //   }}>
    //     <label style={{fontSize: 12, cursor: 'pointer'}}>Add Sub Category</label>
    //   </div>
    // </div>
}

const mapsToProps = (state) => {
    return {
        expense: state.expense,
    };
};

export default connect(mapsToProps)(ExpenseSubCategoriesCard);