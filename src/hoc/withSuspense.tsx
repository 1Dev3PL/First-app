import React from 'react';
import Preloader from "../components/Common/Preloader/Preloader";

function withSuspense<WrappedComponentProps>(WrappedComponent: React.ComponentType<WrappedComponentProps>) {
    return (props: WrappedComponentProps) => {
        return (
            <React.Suspense fallback={<Preloader/>}>
                <WrappedComponent {...props}/>
            </React.Suspense>
        )
    }
}

export default withSuspense;