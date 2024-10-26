import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CheckCircle } from "src/components/icons/CheckCircle";
import { InfoIcon } from "src/components/icons/InfoIcon";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Alert } from "src/components/Alert";
import { BackButton } from "src/components/BackButton";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";
import { SalesInvoice } from "src/models/SalesInvoice.p";
import { cn } from "src/utils/cn";
import { formatNumber } from "src/utils/number";
import { useRealtime } from "pocketto-react";

export function DemoRealTimeView({
    navigation,
}: {
    navigation: NativeStackScreenProps<any>['navigation'];
}) {
    const route = useRoute();
    const { id: routeId } = route.params as { id: string };
    const id = useMemo(() => routeId === 'new' ? undefined : routeId, [routeId]);
    const [invoice, setInvoice] = useRealtime(SalesInvoice, id);
    const [saved, setSaved] = useState(false);
    const [beingUpdated, setBeingUpdated] = useState(false);

    const [rev, setRev] = useState('');
    useEffect(() => {
        if (invoice.rev !== rev && rev && invoice.rev && !saved) {
            setBeingUpdated(true);
            setTimeout(() => setBeingUpdated(false), 3000);
        } else {
            setRev(invoice.rev);
        }
    }, [invoice.rev, rev, saved]);

    const save = useCallback(async () => {
        invoice.subtotalAmount = Number(invoice.subtotalAmount);
        invoice.taxRate = Number(invoice.taxRate);
        invoice.taxAmount = Number(invoice.taxAmount);
        invoice.totalAmount = Number(invoice.totalAmount);
        invoice.paidAmount = Number(invoice.paidAmount);
        setInvoice(await invoice.save());
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    }, [invoice]);

    return <>
        <Alert type='success' title="Invoice saved!" show={saved} icon={<CheckCircle width={20} height={20} className="mt-0.5 text-white mr-4" />} />
        <Alert type='info' title="Invoice was updated by other user!" show={beingUpdated} icon={<InfoIcon width={20} height={20} className="mt-0.5 text-white mr-4" />} />
        <View className="bg-white h-full px-4">
            <View className="flex flex-row justify-between">
                <BackButton onPress={() => navigation.goBack()} />
                <Button label="Save" onPress={save} />
            </View>
            <View className="flex flex-row justify-between">
                <View className="w-[10%]">
                    <Text className="font-medium text-sm text-slate-500">Color</Text>
                    <Pressable
                        className={cn(
                            "w-10 h-10 mt-1 rounded-full",
                            !invoice.color && "border border-slate-300",
                        )}
                        style={{ backgroundColor: invoice.color }}
                        onPress={() => {
                            invoice.setRandomHexColor();
                            setInvoice(invoice);
                        }}
                    ></Pressable>
                </View>
                <View className="w-[85%]">
                    <Text className="font-medium text-sm text-slate-500">Customer Name</Text>
                    <Input
                        value={invoice.customerName}
                        onChange={(value) => {
                            invoice.customerName = value;
                            setInvoice(invoice);
                        }}
                    ></Input>
                </View>
            </View>
            <View className="mt-4 flex flex-row justify-between">
                <View className="w-[48%]">
                    <Text className="font-medium text-sm text-slate-500">Subtotal Amount</Text>
                    <Input
                        keyboardType='numeric'
                        value={String(invoice.subtotalAmount || '')}
                        onChange={(value) => {
                            invoice.subtotalAmount = value;
                            invoice.taxAmount = Number(value) * Number(invoice.taxRate) / 100;
                            const totalAmount = Number(value) + Number(invoice.taxAmount);
                            invoice.totalAmount = totalAmount;
                            setInvoice(invoice);
                        }}
                    ></Input>
                </View>
                <View className="w-[48%]">
                    <Text className="font-medium text-sm text-slate-500">Tax Rate (%)</Text>
                    <Input
                        keyboardType='numeric'
                        value={String(invoice.taxRate || '')}
                        onChange={(value) => {
                            invoice.taxRate = value;
                            invoice.taxAmount = Number(invoice.subtotalAmount) * Number(value) / 100;
                            const totalAmount = Number(invoice.subtotalAmount) + Number(invoice.taxAmount);
                            invoice.totalAmount = totalAmount;
                            setInvoice(invoice);
                        }}
                    ></Input>
                </View>
            </View>

            <View className="mt-4 flex flex-row justify-between">
                <View className="w-[48%]">
                    <Text className="font-medium text-sm text-slate-500">Tax Amount</Text>
                    <Input className="border rounded-md px-2 focus:outline-react-500 h-12 w-full disabled:opacity-50" disabled value={formatNumber(invoice.taxAmount || 0)} />
                </View>
                <View className="w-[48%]">
                    <Text className="font-medium text-sm text-slate-500">Grant Total Amount</Text>
                    <Input className="border rounded-md px-2 focus:outline-react-500 h-12 w-full disabled:opacity-50" disabled value={formatNumber(invoice.totalAmount || 0)} />
                </View>
            </View>

            <View className="mt-4 w-full">
                <Text className="font-medium text-sm text-slate-500">Paid Amount</Text>
                <Input
                    className={cn(
                        'border rounded-md px-2 focus:outline-react-500 h-12 w-full',
                        Number(invoice.paidAmount) > Number(invoice.totalAmount) && 'border-error focus:outline-error',
                    )}
                    value={String(invoice.paidAmount || '')}
                    onChange={(value) => {
                        invoice.paidAmount = value;
                        setInvoice(invoice);
                    }}
                />
                {Number(invoice.paidAmount) > Number(invoice.totalAmount) && <Text className="text-xs text-error">Paid amount should be less than total amount</Text>}
                {Number(invoice.paidAmount) === Number(invoice.totalAmount) && <Text className="text-xs text-success">All cleared!</Text>}
            </View>
        </View>
    </>
}