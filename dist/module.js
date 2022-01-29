import {jsx as $aODKb$jsx} from "react/jsx-runtime";
import $aODKb$react, {useCallback as $aODKb$useCallback, useEffect as $aODKb$useEffect} from "react";
import {enableES5 as $aODKb$enableES5} from "immer";
import {useImmer as $aODKb$useImmer} from "use-immer";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $393673603234b845$exports = {};

$parcel$export($393673603234b845$exports, "ContextProvider", function () { return $393673603234b845$export$9f27bc3417b4524d; }, function (v) { return $393673603234b845$export$9f27bc3417b4524d = v; });





$aODKb$enableES5();
const $a406a6d4cebe87fe$export$9f27bc3417b4524d = (props)=>{
    const [context, setContext] = $aODKb$useImmer(props.value);
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
    const [contextObj, setContextObj] = $aODKb$react.useState({
        ...context,
        updateContext: updateContext,
        removeFromContext: removeFromContext
    });
    $aODKb$useEffect(()=>{
        setContextObj({
            ...context,
            updateContext: updateContext,
            removeFromContext: removeFromContext
        });
    }, [
        context,
        updateContext,
        removeFromContext
    ]);
    return(/*#__PURE__*/ $aODKb$jsx(props.contextObj.Provider, {
        value: contextObj,
        children: props.children
    }));
};


var $393673603234b845$export$9f27bc3417b4524d;
$393673603234b845$export$9f27bc3417b4524d = $a406a6d4cebe87fe$export$9f27bc3417b4524d;


export {$393673603234b845$export$9f27bc3417b4524d as ContextProvider, $393673603234b845$exports as default};
//# sourceMappingURL=module.js.map
