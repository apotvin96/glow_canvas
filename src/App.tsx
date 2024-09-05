import { useEffect, useState } from "react";
import "./App.css";
import { config } from "./config";
import { getPresets, getSystemState } from "./api";

function App() {
    const [systemState, setSystemState] = useState<any | null>(null);
    const [presets, setPresets] = useState<any | null>(null);

    useEffect(() => {
        getSystemState().then((state: any | null) => {
            setSystemState(state);
        });

        getPresets().then((presets: any | null) => {
            setPresets(presets);

            console.log("Presets: ", presets);
        });
    }, []);

    const renderPresets = (): React.ReactNode => {
        if (!presets) {
            return <div>Loading presets...</div>;
        }

        const presetItems = [];

        for (const [index, preset] of Object.entries<any>(presets)) {
            presetItems.push(<div key={index}>{preset.n}</div>);
        }

        return presetItems;
    };

    return (
        <div className="flex flex-col h-[100vh] max-h-[100vh] bg-gray p-12 overflow-clip">
            <div className="flex items-end gap-2">
                <div className="text-5xl font-oswald font-semibold text-white">
                    LED DEVICE
                </div>
                <div className="text-2xl font-roboto-mono text-brand">
                    {config.DEVICE_URL}
                </div>
            </div>

            <div className="flex-1 flex w-full">
                <div className="w-60">
                    <div className="lex flex-col">{renderPresets()}</div>
                </div>

                <div className="flex-1 shadow-lg p-2">
                    {systemState && presets && (
                        <div>{JSON.stringify(presets[systemState.pl])}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
