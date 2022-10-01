const OnEmultorTypeSelected=(e)=>{
    //     if(e.description?.trim() === ""){
    //         dispatch(updateWSConfigContextModel({keyName:"EmulatorType", value: e.description.trim()}));
    //         setEmulatorError('Emulator Type is required')
    //     }

    // }
    const onRowsNumBlur = (e) =>{
        if(e.target.value?.trim() === ""){
            dispatch(updateWSConfigContextModel({keyName:"Rows", value: e.target.value.trim()}));
            setErrorText('Row is required')
        }
    };
     const onColumnsNumBlur = (e) =>{
        if(e.target.value?.trim() === ""){
            dispatch(updateWSConfigContextModel({keyName:"Columns", value: e.target.value.trim()}));
            setErrorText('Column is required')
        }
    };

    // let selectedEmulatorTypeObject = null;
    // console.log("searches",searchesConfigDetails)
    // console.log("sysManagerWSChoiceLists?.length",sysManagerWSChoiceLists?.length);
    // console.log("searchesConfigDetails?.emulatorType",searchesConfigDetails?.emulatorType);
    // if (searchesConfigDetails?.emulatorType=="" && sysManagerWSChoiceLists?.length > 0) {

    //     const objValue = _.filter(sysManagerWSChoiceLists?.find(f=>f.name==='emulatortypes')?.selections, (item) => {
    //         console.log("item.name",item.name);
            // return item.name === searchesConfigDetails.emulatorType
    //     });
    //     if (objValue.length > 0) {
    //         console.log("objValue",objValue);
    //         selectedEmulatorTypeObject = objValue[0];
    //         dispatch(updateSelectedEmulatorType(objValue[0]));
    //     }
    // }
    //  if (!searchesConfigDetails?.emulatorType && sysManagerWSChoiceLists?.length > 0) {

    //     const objValue = _.filter(sysManagerWSChoiceLists?.find(f=>f.name==='emulatortypes')?.selections);
    //     if (objValue.length == 1) {
    //         selectedEmulatorTypeObject = objValue[0];
    //         dispatch(updateSelectedEmulatorType(objValue[0]));
    //     }
    // }

    {                                                    
        (searchesConfigDetails.emulatorType == "" && generalTabConfig.isFromEmulators) &&
            <div className={styles.parentBullet}>
                <div className={styles.bulletStyle}/>
                {"Emulator Type is required"}
            </div>
    }
    
    {
        (emulatorRowError && generalTabConfig.isFromEmulators) && 
        <div className={styles.parentBullet}>
                <div className={styles.bulletStyle}/>
                {emulatorRowError}
            </div>
    }
    {
        (emulatorColumnError && generalTabConfig.isFromEmulators) && 
        <div className={styles.parentBullet}>
                <div className={styles.bulletStyle}/>
                {emulatorColumnError}
            </div>
    }
    {searchesConfigDetails.sessionId === ""}
    {                                                    
        ((!searchesConfigDetails.sessionId || selectedEmulatorSessionId?.name === "") && generalTabConfig.isFromEmulators && selectedEmulatorSessionId?.id !== 0) ?
            <div className={styles.parentBullet}>
                <div className={styles.bulletStyle}/>
                {"Sesssion Id is required"}
            </div>
            :
            
            selectedEmulatorSessionId && selectedEmulatorSessionId?.id == 0 && generalTabConfig.isFromEmulators &&
            <div className={styles.parentBullet}>
                <div className={styles.bulletStyle}/>
          {"Sesssion Id is not valid. Please select a valid item from the selection list."}
          </div>
    }