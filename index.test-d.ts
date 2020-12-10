import { expectAssignable, expectType } from "tsd";
import { PackageJson } from "type-fest";
import hac_k = require(".");
import { Result } from ".";

expectType<Result<never>>(hac_k("Help text"));
expectType<Result<never>>(hac_k("Help text", { hardRejection: false }));
expectAssignable<{ flags: { foo: number } }>(
	hac_k({ flags: { foo: { type: "number", isRequired: true } } })
);
expectAssignable<{ flags: { foo: string } }>(
	hac_k({ flags: { foo: { type: "string", isRequired: true } } })
);
expectAssignable<{ flags: { foo: boolean } }>(
	hac_k({ flags: { foo: { type: "boolean", isRequired: true } } })
);
expectAssignable<{ flags: { foo: number | undefined } }>(
	hac_k({ flags: { foo: { type: "number" } } })
);
expectAssignable<{ flags: { foo: string | undefined } }>(
	hac_k({ flags: { foo: { type: "string" } } })
);
expectAssignable<{ flags: { foo: boolean | undefined } }>(
	hac_k({ flags: { foo: { type: "boolean" } } })
);
expectType<Result<never>>(hac_k({ description: "foo" }));
expectType<Result<never>>(hac_k({ description: false }));
expectType<Result<never>>(hac_k({ help: "foo" }));
expectType<Result<never>>(hac_k({ help: false }));
expectType<Result<never>>(hac_k({ version: "foo" }));
expectType<Result<never>>(hac_k({ version: false }));
expectType<Result<never>>(hac_k({ autoHelp: false }));
expectType<Result<never>>(hac_k({ autoVersion: false }));
expectType<Result<never>>(hac_k({ pkg: { foo: "bar" } }));
expectType<Result<never>>(hac_k({ argv: ["foo", "bar"] }));
expectType<Result<never>>(hac_k({ inferType: true }));
expectType<Result<never>>(hac_k({ booleanDefault: true }));
expectType<Result<never>>(hac_k({ booleanDefault: null }));
expectType<Result<never>>(hac_k({ booleanDefault: undefined }));
expectType<Result<never>>(hac_k({ hardRejection: false }));

const result = hac_k("Help text", {
	flags: {
		foo: { type: "boolean", alias: "f" },
		"foo-bar": { type: "number" },
		bar: { type: "string", default: "" },
		abc: { type: "string", isMultiple: true },
	},
});

expectType<string[]>(result.input);
expectType<PackageJson>(result.pkg);
expectType<string>(result.help);

expectType<boolean | undefined>(result.flags.foo);
expectType<unknown>(result.flags.fooBar);
expectType<string>(result.flags.bar);
expectType<string[] | undefined>(result.flags.abc);
expectType<boolean | undefined>(result.unnormalizedFlags.foo);
expectType<unknown>(result.unnormalizedFlags.f);
expectType<number | undefined>(result.unnormalizedFlags["foo-bar"]);
expectType<string>(result.unnormalizedFlags.bar);
expectType<string[] | undefined>(result.unnormalizedFlags.abc);

result.showHelp();
result.showHelp(1);
result.showVersion();
