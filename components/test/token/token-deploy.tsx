"use client"

import { useSorosanSDK } from '@/components/shared/sorosan-provider';
import { Assert } from '@/lib/assert';
import { TestCaseProps, TestStatusType, TestTemplate } from '@/components/test/test-template';

const testDescription = "it should successfully deploy a smart token contract"
export const TokenDeploy = ({ run, status }: TestCaseProps) => {
    const { sdk } = useSorosanSDK();

    const runTest = async () => {
        const testStatus: TestStatusType = {
            description: testDescription,
            status: "success",
            time: 0
        };
        const start = new Date();

        try {
            // Arrange
            await sdk.login();
            const expectedTokenContract = "";

            // Act
            const actualTokenContract = await sdk.token.deploy();

            // Assert
            Assert.isTrue(expectedTokenContract !== actualTokenContract);
        } catch (error: any) {
            testStatus.status = "error";
            testStatus.error = error.message;
            console.log(error);
        }

        testStatus.time = new Date().getTime() - start.getTime();
        status((prev: TestStatusType[]) => [...prev, testStatus]);
    }

    return (
        <TestTemplate
            title={testDescription}
            run={run}
            status={status}
            runTest={runTest} />
    )
}