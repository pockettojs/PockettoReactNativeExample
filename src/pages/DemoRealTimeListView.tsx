import { faker } from "@faker-js/faker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, ScrollView, Text, View } from "react-native";
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
    const salesInvoices = useRealtimeList(SalesInvoice);

    return <View className="bg-white">
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

                    const customerName = `${faker.person.firstName()} ${faker.person.lastName()}`;
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
                salesInvoices.map((invoice, index) => <Pressable
                    key={index}
                    className="border-t border-slate-300 p-4"
                    onPress={() => {
                        navigation.navigate('realtime/:id', { id: invoice.id });
                    }}
                >
                    <View className="flex flex-row justify-between">
                        <View className="text-black  w-8 h-8 rounded-full" style={{ backgroundColor: invoice.color }}></View>
                        <Text className="text-black text-lg">{invoice.customerName}</Text>
                    </View>
                    <View className="h-2"></View>
                    <View className="flex flex-row justify-between">
                        <Text className="text-black  mt-1 text-md font-semibold">Subtotal:</Text>
                        <Text className="text-black text-lg text-right">{formatNumber(invoice.subtotalAmount)}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="text-black  mt-1 text-md font-semibold">Tax Amount:</Text>
                        <Text className="text-black text-lg text-right">{formatNumber(invoice.taxAmount)}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="text-black  mt-1 text-md font-semibold">Grand Total:</Text>
                        <Text className="text-black text-lg text-right">{formatNumber(invoice.totalAmount)}</Text>
                    </View>

                    <View className="h-2"></View>
                    <View className="flex flex-row justify-between">
                        <Text className="text-black  mt-1 text-md font-semibold">Paid Amount:</Text>
                        <Text className="text-black text-lg font-semibold text-right">{formatNumber(invoice.paidAmount)}</Text>
                    </View>
                    <ProgressionBar percentage={invoice.paidPercentage}></ProgressionBar>
                </Pressable>)
            }
        </ScrollView>
        {
            salesInvoices.length === 0 && <View className="flex justify-center items-center h-[100%]">
                <Text className="text-lg text-center px-8 text-slate-500 mt-[-200px]">
                    No data available, click the button above to add fake data
                </Text>
            </View>
        }
    </View>
}