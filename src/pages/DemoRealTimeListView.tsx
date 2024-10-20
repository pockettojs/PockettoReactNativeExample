import { faker } from "@faker-js/faker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button } from "src/components/Button";
import { ProgressionBar } from "src/components/ProgressionBar";
import { useRealtimeList } from "src/hooks/useRealtimeList";
import { SalesInvoice } from "src/models/SalesInvoice.p";
import { formatNumber } from "src/utils/number";

export function DemoRealTimeListView({
    navigation,
}: {
    navigation: NativeStackScreenProps<any>['navigation'];
}) {
    const [initList, setInitList] = useState<SalesInvoice[]>([]);
    const salesInvoices = useRealtimeList(SalesInvoice, {
        value: initList,
        order: 'desc',
    });

    useEffect(() => {
        SalesInvoice.query()
            .orderBy('createdAt', 'desc')
            .get()
            .then((result) => setInitList(result));
    }, []);

    return <View className="w-full h-full bg-white">
        <Text className="p-4 text-2xl font-medium">React Native + Pocketto</Text>
        <View className="flex flex-row gap-4 justify-end mr-4 mb-4">
            <Button label="Add New" onPress={() => {
                navigation.navigate('realtime/:id', { id: 'new' });
            }}></Button>
            <Button
                label="Create Fake Data"
                onPress={async () => {
                    const taxRate = 7;
                    const subtotalAmount = faker.number.float({ min: 1, max: 500, fractionDigits: 0 });
                    let taxAmount = subtotalAmount * taxRate / 100;
                    taxAmount = Math.round(taxAmount * 100) / 100;
                    const totalAmount = subtotalAmount + taxAmount;

                    const customerName = `${faker.name.firstName()} ${faker.name.lastName()}`;
                    const invoice = new SalesInvoice();
                    invoice.fill({
                        customerName,
                        subtotalAmount,
                        taxRate,
                        taxAmount,
                        totalAmount,
                        paidAmount: faker.number.float({ min: 0, max: totalAmount, fractionDigits: 0 }),
                    });
                    await invoice
                        .setRandomHexColor()
                        .save();
                }}
            >
            </Button>
        </View>
        <ScrollView>
            {
                salesInvoices.map((invoice, index) => <View key={index} className="border-t border-slate-300 p-4">
                    <View className="flex flex-row justify-between">
                        <View className="w-8 h-8 rounded-full" style={{ backgroundColor: invoice.color }}></View>
                        <Text className="text-lg">{invoice.customerName}</Text>
                    </View>
                    <View className="h-2"></View>
                    <View className="flex flex-row justify-between">
                        <Text className="mt-1 text-md font-semibold">Subtotal:</Text>
                        <Text className="text-lg text-right">{formatNumber(invoice.subtotalAmount)}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="mt-1 text-md font-semibold">Tax Amount:</Text>
                        <Text className="text-lg text-right">{formatNumber(invoice.taxAmount)}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="mt-1 text-md font-semibold">Grand Total:</Text>
                        <Text className="text-lg text-right">{formatNumber(invoice.totalAmount)}</Text>
                    </View>

                    <View className="h-2"></View>
                    <View className="flex flex-row justify-between">
                        <Text className="mt-1 text-md font-semibold">Paid Amount:</Text>
                        <Text className="text-lg font-semibold text-right">{formatNumber(invoice.paidAmount)}</Text>
                    </View>
                    <ProgressionBar percentage={invoice.paidPercentage}></ProgressionBar>
                </View>)
            }
        </ScrollView>
    </View>
}