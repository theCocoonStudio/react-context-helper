import {jsx as $aODKb$jsx} from "react/jsx-runtime";
import {useCallback as $aODKb$useCallback, useMemo as $aODKb$useMemo, useContext as $aODKb$useContext, useState as $aODKb$useState, memo as $aODKb$memo} from "react";
import {enableES5 as $aODKb$enableES5} from "immer";
import {useImmer as $aODKb$useImmer, useImmerReducer as $aODKb$useImmerReducer} from "use-immer";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $393673603234b845$exports = {};

$parcel$export($393673603234b845$exports, "ContextProvider", function () { return $393673603234b845$export$9f27bc3417b4524d; }, function (v) { return $393673603234b845$export$9f27bc3417b4524d = v; });





$aODKb$enableES5();
const $a406a6d4cebe87fe$export$9f27bc3417b4524d = ({ value: value , contextObj: contextObj , children: children  })=>{
    const [context, setContext] = $aODKb$useImmer(value);
    const updateContext = $aODKb$useCallback((toMerge)=>{
        setContext((draft)=>{
            Object.assign(draft, toMerge);
        });
    }, [
        setContext
    ]);
    const removeFromContext = $aODKb$useCallback((toDelete)=>{
        setContext((draft)=>{
            toDelete.forEach((key)=>{
                delete draft[key];
            });
        });
    }, [
        setContext
    ]);
    //prevents a rerender in consumers every time the Provider's parent rerenders
    const contextValue = $aODKb$useMemo(()=>({
            ...context,
            updateContext: updateContext,
            removeFromContext: removeFromContext
        })
    , [
        context,
        updateContext,
        removeFromContext
    ]);
    return(/*#__PURE__*/ $aODKb$jsx(contextObj.Provider, {
        value: contextValue,
        children: children
    }));
};
const $a406a6d4cebe87fe$export$3bca6b9001e9621c = ({ value: value , contextObj: contextObj , children: children , reducer: reducer ,  })=>{
    const [context, dispatch] = $aODKb$useImmerReducer(reducer, value);
    const contextValue = $aODKb$useMemo(()=>({
            ...context,
            dispatch: dispatch
        })
    , [
        context,
        dispatch
    ]);
    return(/*#__PURE__*/ $aODKb$jsx(contextObj.Provider, {
        value: contextValue,
        children: children
    }));
};
const $a406a6d4cebe87fe$export$b4c8ee8f2434bf17 = (ChildComponent, ContextObj, contextPropsKeys)=>{
    const context = $aODKb$useContext(ContextObj);
    const contextMap = contextPropsKeys.filter((key)=>Object.prototype.hasOwnProperty.call(context, key)
    ).map((key)=>[
            key,
            context[key]
        ]
    );
    const contextProps = Object.fromEntries(contextMap);
    const [Memo] = $aODKb$useState(/*#__PURE__*/ $aODKb$memo(ChildComponent));
    return [
        Memo,
        contextProps
    ];
};


var $393673603234b845$export$9f27bc3417b4524d;
$393673603234b845$export$9f27bc3417b4524d = $a406a6d4cebe87fe$export$9f27bc3417b4524d;


export {$393673603234b845$export$9f27bc3417b4524d as ContextProvider, $393673603234b845$exports as default};
//# sourceMappingURL=module.js.map
